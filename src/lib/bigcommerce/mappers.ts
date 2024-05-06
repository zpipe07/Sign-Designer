import React from "react"
import {
  BigCommerceSortKeys,
  VercelSortKeys,
  vercelToBigCommerceSortKeys,
} from "@/src/lib/constants"
import {
  BigCommerceCart,
  BigCommerceCheckout,
  BigCommerceCollection,
  BigCommercePage,
  BigCommerceProduct,
  BigCommerceProductOption,
  BigCommerceProductVariant,
  CartCustomItem,
  DigitalOrPhysicalItem,
  LineItem,
  VercelCart,
  VercelCartItem,
  VercelCollection,
  VercelPage,
  VercelProduct,
  VercelProductOption,
  VercelProductVariant,
} from "./types"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"

var fs = require("fs")

type ProductsList = {
  productId: number
  productData: BigCommerceProduct
}[]

const vercelFromBigCommerceLineItems = (
  lineItems: BigCommerceCart["lineItems"],
) => {
  const { physicalItems, digitalItems, customItems } = lineItems
  const cartItemMapper = ({
    entityId,
    quantity,
    productEntityId,
  }: DigitalOrPhysicalItem | CartCustomItem) => ({
    merchandiseId: productEntityId
      ? productEntityId.toString()
      : entityId.toString(),
    quantity,
  })

  return [physicalItems, digitalItems, customItems].flatMap((list) =>
    list.map(cartItemMapper),
  )
}

const bigCommerceToVercelOptions = (
  options: BigCommerceProductOption[],
): VercelProductOption[] => {
  return options.map((option) => {
    return {
      id: option.entityId.toString(),
      name: option.displayName.toString(),
      values: option.values
        ? option.values.edges.map(({ node: value }) => ({
            label: value.label,
            entityId: value.entityId,
          }))
        : [],
    }
  })
}
const bigCommerceToVercelVariants = (
  variants: BigCommerceProductVariant[],
  productId: number,
): VercelProductVariant[] => {
  return variants.map((variant) => {
    return {
      parentId: productId.toString(),
      id: variant.entityId.toString(),
      title: "",
      availableForSale: variant.isPurchasable,
      selectedOptions: variant.options?.edges.map(
        ({ node: option }) => ({
          name: option.displayName ?? "",
          value:
            option.values.edges.map(({ node }) => node.label)[0] ??
            "",
        }),
      ) || [
        {
          name: "",
          value: "",
        },
      ],
      price: {
        amount:
          variant.prices?.price.value.toString() ||
          variant.prices?.priceRange.max.value.toString() ||
          "0",
        currencyCode:
          variant.prices?.price.currencyCode ||
          variant.prices?.priceRange.max.currencyCode ||
          "",
      },
    }
  })
}

const bigCommerceToVercelProduct = (
  product: BigCommerceProduct,
): VercelProduct => {
  const createVercelProductImage = (img: {
    url: string
    altText: string
  }) => {
    return {
      url: img ? img.url : "",
      altText: img ? img.altText : "",
      width: 2048,
      height: 2048,
    }
  }
  const options = product.productOptions.edges.length
    ? bigCommerceToVercelOptions(
        product.productOptions.edges.map((item) => item.node),
      )
    : []
  const variants = product.variants.edges.length
    ? bigCommerceToVercelVariants(
        product.variants.edges.map((item) => item.node),
        product.entityId,
      )
    : []

  return {
    id: product.id.toString(),
    handle: product.path,
    availableForSale:
      product.availabilityV2.status === "Available" ? true : false,
    title: product.name,
    description: product.plainTextDescription || "",
    descriptionHtml: product.description ?? "",
    options,
    priceRange: {
      maxVariantPrice: {
        amount:
          product.prices.priceRange.max.value.toString() ||
          product.prices.price.value.toString() ||
          "0",
        currencyCode:
          product.prices.priceRange.max.currencyCode ||
          product.prices.price.currencyCode ||
          "",
      },
      minVariantPrice: {
        amount:
          product.prices.priceRange.min.value.toString() ||
          product.prices.price.value.toString() ||
          "0",
        currencyCode:
          product.prices.priceRange.min.currencyCode ||
          product.prices.price.currencyCode ||
          "",
      },
    },
    variants,
    images: product.images
      ? product.images.edges.map(({ node: img }) =>
          createVercelProductImage(img),
        )
      : [],
    featuredImage: createVercelProductImage(product.defaultImage),
    seo: {
      title: product.seo.pageTitle || product.name,
      description: product.seo.metaDescription || "",
    },
    tags: [product.seo.metaKeywords] || [],
    updatedAt: product.createdAt.utc.toString(),
  }
}

const bigCommerceToVercelProducts = (
  products: BigCommerceProduct[],
) => {
  const reshapedProducts = []

  for (const product of products) {
    if (product) {
      const reshapedProduct = bigCommerceToVercelProduct(product)

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct)
      }
    }
  }

  return reshapedProducts
}

const bigCommerceToVercelCartItems = (
  lineItems: BigCommerceCart["lineItems"],
  products: ProductsList,
) => {
  const getItemMapper = (
    products: ProductsList,
    isCustomItem: boolean = false,
  ) => {
    return (
      item: CartCustomItem | DigitalOrPhysicalItem,
    ): VercelCartItem => {
      const vercelProductFallback = {
        id: "",
        handle: "",
        availableForSale: false,
        title: "",
        description: "",
        descriptionHtml: "",
        options: [],
        priceRange: {
          maxVariantPrice: { amount: "", currencyCode: "" },
          minVariantPrice: { amount: "", currencyCode: "" },
        },
        variants: [],
        featuredImage: {
          url: "",
          altText: "",
          width: 0,
          height: 0,
        },
        images: [
          {
            url: "",
            altText: "",
            width: 0,
            height: 0,
          },
        ],
        seo: { title: "", description: "" },
        tags: [],
        updatedAt: "",
      }
      let product
      let selectedOptions

      if (isCustomItem) {
        product = vercelProductFallback
        selectedOptions = [{ name: "", value: "" }]
      } else {
        const productData = products.filter(
          ({ productId }) =>
            productId ===
            (item as DigitalOrPhysicalItem).productEntityId,
        )[0]?.productData

        product = productData
          ? bigCommerceToVercelProduct(productData)
          : vercelProductFallback
        selectedOptions = (
          item as DigitalOrPhysicalItem
        ).selectedOptions.map((option) => ({
          name: option.name,
          value:
            option.value ||
            option.text ||
            option.number?.toString() ||
            option.fileName ||
            "",
        }))
      }

      return {
        id: item.entityId.toString(), // NOTE: used as lineId || lineItemId
        quantity: item.quantity,
        cost: {
          totalAmount: {
            amount:
              item.extendedListPrice.value.toString() ||
              item.listPrice.value.toString() ||
              "0",
            currencyCode:
              item.extendedListPrice.currencyCode ||
              item.listPrice.currencyCode ||
              "",
          },
        },
        merchandise: {
          id: isCustomItem
            ? item.entityId.toString()
            : (
                item as DigitalOrPhysicalItem
              ).variantEntityId!.toString(),
          title: `${item.name}`,
          selectedOptions,
          product,
        },
      }
    }
  }

  const { physicalItems, digitalItems, customItems } = lineItems
  const areCustomItemsInCart = customItems.length > 0
  const line1 = physicalItems.map((item) =>
    getItemMapper(products)(item),
  )
  const line2 = digitalItems.map((item) =>
    getItemMapper(products)(item),
  )
  const line3 = areCustomItemsInCart
    ? customItems.map((item) =>
        getItemMapper(products, areCustomItemsInCart)(item),
      )
    : []

  return [...line1, ...line2, ...line3]
}

const bigCommerceToVercelCart = (
  cart: BigCommerceCart,
  products: ProductsList,
  checkout: BigCommerceCheckout,
  checkoutUrl?: string,
): VercelCart => {
  return {
    id: cart.entityId,
    checkoutUrl: checkoutUrl ?? "",
    cost: {
      subtotalAmount: {
        amount: checkout.subtotal.value.toString(),
        currencyCode: checkout.subtotal.currencyCode,
      },
      totalAmount: {
        amount: checkout.grandTotal.value.toString(),
        currencyCode: checkout.grandTotal.currencyCode,
      },
      totalTaxAmount: {
        amount: checkout.taxTotal.value.toString(),
        currencyCode: checkout.taxTotal.currencyCode,
      },
    },
    lines: bigCommerceToVercelCartItems(cart.lineItems, products),
    totalQuantity: cart.lineItems.totalQuantity,
  }
}

const bigCommerceToVercelCollection = (
  collection: BigCommerceCollection,
): VercelCollection => {
  if (!collection) {
    return {
      handle: "",
      title: "",
      description: "",
      seo: {
        title: "",
        description: "",
      },
      updatedAt: "",
      path: "",
    }
  }

  return {
    handle: collection.entityId.toString() || collection.name,
    title: collection.name,
    description: collection.description,
    seo: {
      title: collection.seo.pageTitle,
      description: collection.seo.metaDescription,
    },
    updatedAt: new Date().toISOString(),
    path: `/search${collection.path}`,
  }
}

export {
  bigCommerceToVercelCart,
  bigCommerceToVercelCollection,
  bigCommerceToVercelProduct,
  bigCommerceToVercelProducts,
  vercelFromBigCommerceLineItems,
}

export const vercelToBigCommerceSorting = (
  isReversed: boolean,
  sortKey?: string,
): keyof typeof BigCommerceSortKeys | null => {
  const VercelSorting: Record<string, string> = {
    RELEVANCE: "RELEVANCE",
    BEST_SELLING: "BEST_SELLING",
    CREATED_AT: "CREATED_AT",
    PRICE: "PRICE",
  }

  if (!sortKey || VercelSorting[sortKey] === undefined) {
    return null
  }

  if (sortKey === VercelSortKeys.PRICE) {
    return isReversed
      ? vercelToBigCommerceSortKeys.PRICE_ON_REVERSE
      : vercelToBigCommerceSortKeys.PRICE
  }

  return vercelToBigCommerceSortKeys[
    sortKey as keyof typeof VercelSortKeys
  ]
}

export const bigCommerceToVercelPageContent = (
  page: BigCommercePage,
): VercelPage => {
  return {
    id: page.entityId.toString(),
    title: page.name,
    handle: page.path.slice(1),
    body: page.htmlBody ?? "",
    bodySummary: page.plainTextSummary ?? "",
    seo: {
      title: page.seo.pageTitle,
      description: page.seo.metaDescription,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// TODO construct this mapping dynamically
export const signProductId = 112
const formToCartMap = {
  shape: {
    entityId: 119,
    rectangle: 112,
    ellipse: 113,
    topRound: 114,
    sideRound: 115,
    bread: 116,
  },
  orientation: {
    entityId: 120,
    horizontal: 117,
    vertical: 118,
  },
  size: {
    entityId: 121,
    small: 119,
    medium: 120,
  },
  textLine: {
    entityId: 117,
  },
  font: {
    entityId: 118,
    times: 110,
    verdana: 111,
  },
  color: {
    entityId: 123,
    "black/white": 121,
    "tan/green": 122,
    "yellow/black": 123,
  },
  svg: {
    entityId: 122,
  },
}

export const getProductFormMapping = (product: VercelProduct) => {
  const productFormMapping: any = {}
  product.options.forEach(({ id, name, values }) => {
    productFormMapping[name] = {
      entityId: id,
      values,
    }
  })

  return productFormMapping
}

export const formDataToCartItem = async (
  data: DesignFormInputs,
): Promise<LineItem> => {
  const ReactDOMServer = (await import("react-dom/server")).default
  const component = React.createElement(SignDesignerVisualizerView, {
    inputs: data,
  })
  const svg = ReactDOMServer.renderToString(component)

  return {
    quantity: 1,
    productId: signProductId.toString(10),
    merchandiseId: "77",
    selectedOptions: {
      multipleChoices: [
        {
          optionEntityId: formToCartMap.shape.entityId,
          optionValueEntityId: formToCartMap.shape[data.shape],
        },
        {
          optionEntityId: formToCartMap.orientation.entityId,
          optionValueEntityId:
            formToCartMap.orientation[data.orientation],
        },
        {
          optionEntityId: formToCartMap.size.entityId,
          optionValueEntityId: formToCartMap.size[data.size],
        },
        {
          optionEntityId: formToCartMap.font.entityId,
          optionValueEntityId: formToCartMap.font[data.fontFamily],
        },
        {
          optionEntityId: formToCartMap.color.entityId,
          // @ts-ignore
          optionValueEntityId: formToCartMap.color[data.color],
        },
      ],
      textFields: [
        {
          optionEntityId: formToCartMap.textLine.entityId,
          text: data.textLines[0].value,
        },
        {
          optionEntityId: formToCartMap.svg.entityId,
          text: svg,
        },
      ],
    },
  }
}

export const formDataToCartItemRest = async (
  data: DesignFormInputs,
): Promise<any> => {
  const ReactDOMServer = (await import("react-dom/server")).default
  const component = React.createElement(SignDesignerVisualizerView, {
    inputs: data,
  })
  const svg = ReactDOMServer.renderToString(component)

  // return fs.writeFile("some_file_name.svg", svg, function (err: any) {
  //   if (err) {
  //     console.log(err)
  //   }

  //   console.log("Successfully Written to File.")

  const readStream = fs.createReadStream("some_file_name.svg")
  // const formData = new FormData()
  // formData.append("action", "add")
  // formData.append("product_id","112")
  // formData.append("attribute[119]", "112")
  // formData.append("attribute[120]", "117")
  // formData.append("attribute[117]", "123")
  // return formData
  // action: add
  // product_id: 112
  // attribute[119]: 112
  // attribute[120]: 117
  // attribute[117]: 123
  // attribute[118]: 110
  // attribute[124]: (binary)
  // qty[]: 1

  // const formData = new FormData()
  // formData.append("quantity", "1")
  // formData.append("product_id", signProductId.toString())
  // formData.append("variant_id", "77")

  // formData.append(
  //   "option_selections[0]['option_id']",
  //   formToCartMap.shape.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[0]['option_value']",
  //   formToCartMap.shape[data.shape].toString(),
  // )

  // formData.append(
  //   "option_selections[1]['option_id']",
  //   formToCartMap.orientation.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[1]['option_value']",
  //   formToCartMap.orientation[data.orientation].toString(),
  // )

  // formData.append(
  //   "option_selections[2]['option_id']",
  //   formToCartMap.size.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[2]['option_value']",
  //   formToCartMap.size[data.size].toString(),
  // )

  // formData.append(
  //   "option_selections[3]['option_id']",
  //   formToCartMap.font.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[3]['option_value']",
  //   formToCartMap.font[data.fontFamily].toString(),
  // )

  // formData.append(
  //   "option_selections[4]['option_id']",
  //   formToCartMap.color.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[4]['option_value']",
  //   // @ts-ignore
  //   formToCartMap.color[data.color].toString(),
  // )

  // formData.append(
  //   "option_selections[5]['option_id']",
  //   formToCartMap.textLine.entityId.toString(),
  // )
  // formData.append(
  //   "option_selections[5]['option_value']",
  //   data.textLines[0].value,
  // )

  // formData.append(
  //   "option_selections[6]['option_id']",
  //   formToCartMap.svg.entityId.toString(),
  // )
  // formData.append("option_selections[6]['option_value']", svg)

  // // console.log({ ...formData })

  // return formData

  return {
    quantity: 1,
    product_id: signProductId,
    variant_id: 77,
    option_selections: [
      {
        option_id: formToCartMap.shape.entityId,
        option_value: formToCartMap.shape[data.shape],
      },
      {
        option_id: formToCartMap.orientation.entityId,
        option_value: formToCartMap.orientation[data.orientation],
      },
      {
        option_id: formToCartMap.size.entityId,
        option_value: formToCartMap.size[data.size],
      },
      {
        option_id: formToCartMap.font.entityId,
        option_value: formToCartMap.font[data.fontFamily],
      },
      {
        option_id: formToCartMap.color.entityId,
        // @ts-ignore
        option_value: formToCartMap.color[data.color],
      },
      {
        option_id: formToCartMap.textLine.entityId,
        option_value: data.textLines[0].value,
      },
      {
        option_id: formToCartMap.svg.entityId,
        option_value: svg,
      },
      // {
      //   option_id: 124,
      //   // options_value: "some_file_name.svg",
      //   option_value: readStream,
      // },
    ],
  }
  // })
}
