// import opentype from "opentype.js"
// import { promises as fs } from "fs"
// import { decode } from "base64-arraybuffer"
// import { randomUUID } from "crypto"
// import path from "path"
// import queryString from "query-string"

import { createClient } from "@/src/utils/supabase/server"
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
import {
  Color,
  DesignFormInputs,
  FontFamily,
  TextLine,
} from "@/src/components/SignDesigner/types"
import {
  FONT_MAP,
  SIZE_CONFIG_MAP,
  signProductId,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { getProductVariant } from "@/src/lib/bigcommerce/utils"
import { generateModel } from "@/src/utils/makerjs"

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
// export const signProductId = 112
// const formToCartMap = {
//   shape: {
//     entityId: 119,
//     rectangle: 112,
//     ellipse: 113,
//     topRound: 114,
//     sideRound: 115,
//     bread: 116,
//   },
//   orientation: {
//     entityId: 120,
//     horizontal: 117,
//     vertical: 118,
//   },
//   size: {
//     entityId: 121,
//     small: 119,
//     medium: 120,
//   },
//   textLine: {
//     entityId: 117,
//   },
//   font: {
//     entityId: 118,
//     times: 110,
//     verdana: 111,
//   },
//   color: {
//     entityId: 123,
//     "black/white": 121,
//     "tan/green": 122,
//     "yellow/black": 123,
//   },
//   // svgRaw: {
//   //   entityId: 122,
//   // },
//   svgFile: {
//     entityId: 124,
//   },
// }

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
  product: VercelProduct,
  // productOptionsMap: ProductOptionsMap,
): Promise<LineItem> => {
  // const dirRelativeToPublicFolder = "fonts"
  // const dir = path.resolve("./public", dirRelativeToPublicFolder)
  // const fontUrl = `${dir}/${FONT_MAP[data.fontFamily as FontFamily]}`
  // const font = opentype.loadSync(`${fontUrl}`)
  const maxLinesOfText =
    // @ts-ignore
    SIZE_CONFIG_MAP[data.size as Size].maxLinesOfText
  const textLines: TextLine[] = data.textLines?.slice(
    0,
    maxLinesOfText,
  )
  //   .filter(({ value }: TextLine) => {
  //     return !!value
  //   })
  // @ts-ignore
  // const { height, width } = SIZE_CONFIG_MAP[data.size as Size]
  // const [foregroundColor, backgroundColor] = data.color.split(
  //   "::",
  // ) as Color[]
  // const modelInputs = {
  //   height,
  //   width,
  //   outerBorderWidth: 0.3,
  //   innerBorderWidth: parseFloat(data.borderWidth),
  //   textLines,
  //   foregroundColor,
  //   backgroundColor,
  //   inputs: data,
  //   font,
  // }
  // const { svg: svgPathOnly } = generateModel({
  //   ...modelInputs,
  //   strokeOnly: true,
  //   actualDimensions: true,
  // })
  // const { svg: svgWithFill } = generateModel({
  //   ...modelInputs,
  //   strokeOnly: false,
  //   actualDimensions: false,
  //   showShadow: true,
  // })
  // const fileId = `${data.color}-${randomUUID()}`

  // generate SVG file
  // const pathOnlyFileName = `${fileId}--path-only.svg`
  // await fs.writeFile(`/tmp/${pathOnlyFileName}`, svgPathOnly)
  // const svgPathOnlyFile = await fs.readFile(
  //   `/tmp/${pathOnlyFileName}`,
  //   {
  //     encoding: "base64",
  //   },
  // )

  // const withFillFileName = `${fileId}--with-fill.svg`
  // await fs.writeFile(`/tmp/${withFillFileName}`, svgWithFill)
  // const svgWithFillFile = await fs.readFile(
  //   `/tmp/${withFillFileName}`,
  //   {
  //     encoding: "base64",
  //   },
  // )

  // save file to supabase
  // const supabase = createClient()
  // const { error: svgPathOnlyFileError } = await supabase.storage
  //   .from("signs")
  //   .upload(pathOnlyFileName, decode(svgPathOnlyFile), {
  //     contentType: "image/svg+xml",
  //   })

  // if (svgPathOnlyFileError) {
  //   throw svgPathOnlyFileError
  // }

  // const { error: svgWithFillFileError } = await supabase.storage
  //   .from("signs")
  //   .upload(withFillFileName, decode(svgWithFillFile), {
  //     contentType: "image/svg+xml",
  //   })

  // if (svgWithFillFileError) {
  //   throw svgWithFillFileError
  // }

  const variant = getProductVariant(data, product)

  if (!variant) {
    throw new Error("Product variant not found")
  }

  return {
    quantity: 1,
    productId: signProductId.toString(10),
    merchandiseId: variant.id,
    selectedOptions: {
      multipleChoices: [
        {
          optionEntityId: parseInt(
            product.options.find(({ name }) => name === "color")
              ?.id as string,
            10,
          ),
          optionValueEntityId: product.options
            .find(({ name }) => name === "color")
            ?.values.find(({ label }) => label === data.color)
            ?.entityId!,
        },
      ],
      textFields: [
        // {
        //   optionEntityId: parseInt(
        //     product.options.find(({ name }) => name === "file_id")
        //       ?.id as string,
        //     10,
        //   ),
        //   text: fileId,
        // },
        // {
        //   optionEntityId: parseInt(
        //     product.options.find(({ name }) => name === "file_id")
        //       ?.id as string,
        //     10,
        //   ),
        //   text: "abc123",
        // },
        {
          optionEntityId: parseInt(
            product.options.find(({ name }) => name === "font")
              ?.id as string,
            10,
          ),
          text: data.fontFamily,
        },
        {
          optionEntityId: parseInt(
            product.options.find(
              ({ name }) => name === "mounting_style",
            )?.id as string,
            10,
          ),
          text: data.mountingStyle,
        },
        {
          optionEntityId: parseInt(
            product.options.find(
              ({ name }) => name === "border_width",
            )?.id as string,
            10,
          ),
          text: data.borderWidth,
        },
        {
          optionEntityId: parseInt(
            product.options.find(({ name }) => name === "text_lines")
              ?.id as string,
            10,
          ),
          // text: data.textLines
          //   .map((text) => queryString.stringify(text))
          //   .join("\n"),
          // text: JSON.stringify(data.textLines),
          text: JSON.stringify(textLines),
        },
        {
          optionEntityId: parseInt(
            product.options.find(({ name }) => name === "edge_style")
              ?.id as string,
            10,
          ),
          text: data.edgeStyle,
        },
      ],
    },
  }
}
