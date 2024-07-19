export type Maybe<T> = T | null

export type Connection<T> = {
  edges: Array<Edge<T>>
}

export type Edge<T> = {
  node: T
}

export type VercelPage = {
  id: string
  title: string
  handle: string
  body: string
  bodySummary: string
  seo?: VercelSEO
  createdAt: string
  updatedAt: string
}

export type VercelMenu = {
  title: string
  path: string
}

export type VercelCollection = {
  handle: string
  title: string
  description: string
  seo: VercelSEO
  updatedAt: string
  path: string
}

type VercelMoney = {
  amount: string
  currencyCode: string
}

export type Image = {
  url: string
  altText: string
  width: number
  height: number
}

export type VercelProduct = {
  id: string
  handle: string
  availableForSale: boolean
  title: string
  description: string
  descriptionHtml: string
  options: VercelProductOption[]
  priceRange: {
    maxVariantPrice: VercelMoney
    minVariantPrice: VercelMoney
  }
  variants: VercelProductVariant[]
  featuredImage: Image
  images: Image[]
  seo: VercelSEO
  tags: string[]
  updatedAt: string
}

export type VercelProductOption = {
  id: string
  name: string
  values: { label: string; entityId: number }[]
}

export type VercelProductVariant = {
  parentId?: string
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: VercelMoney
}

export type VercelProductVariantDetails = {
  id: number
  product_id: number
  sku: string
  sku_id: number
  price: null
  calculated_price: number
  sale_price: null
  retail_price: null
  map_price: null
  fixed_cost_shipping_price: null
  cost_price: number
  weight: null
  width: null
  height: null
  depth: null
  is_free_shipping: boolean
  calculated_weight: number
  purchasing_disabled: boolean
  purchasing_disabled_message: string
  image_url: string
  upc: string
  mpn: string
  gtin: string
  inventory_level: number
  inventory_warning_level: number
  bin_picking_number: string
  option_values: {
    id: number
    label: string
    option_id: number
    option_display_name: string
  }[]
}

export type VercelSEO = {
  title: string
  description: string
}

export type VercelCartItem = {
  id: string
  quantity: number
  cost: {
    totalAmount: VercelMoney
  }
  merchandise: {
    id: string
    title: string
    selectedOptions: {
      name: string
      value: string
    }[]
    product: VercelProduct
  }
}

export type VercelCart = {
  id: string
  checkoutUrl: string
  cost: {
    subtotalAmount: VercelMoney
    totalAmount: VercelMoney
    totalTaxAmount: VercelMoney
  }
  lines: VercelCartItem[]
  totalQuantity: number
}

export type BigCommerceCartOperation = {
  data: {
    site: {
      cart: BigCommerceCart
    }
  }
  variables: {
    entityId: string
  }
}

export type BigCommerceCreateCartOperation = {
  data: {
    cart: {
      createCart: {
        cart: BigCommerceCart
      }
    }
  }
  variables: {
    createCartInput: {
      lineItems: CartItem[]
    }
  }
}

export type BigCommerceAddToCartOperation = {
  data: {
    cart: {
      addCartLineItems: {
        cart: BigCommerceCart
      }
    }
  }
  variables: {
    addCartLineItemsInput: {
      cartEntityId: string
      data: {
        lineItems: CartItem[]
      }
    }
  }
}

export type BigCommerceDeleteCartItemOperation = {
  data: {
    cart: {
      deleteCartLineItem: {
        cart: BigCommerceCart
      }
    }
  }
  variables: {
    deleteCartLineItemInput: {
      cartEntityId: string
      lineItemEntityId: string
    }
  }
}

export type BigCommerceUpdateCartItemOperation = {
  data: {
    cart: {
      updateCartLineItem: {
        cart: BigCommerceCart
      }
    }
  }
  variables: {
    updateCartLineItemInput: {
      cartEntityId: string
      lineItemEntityId: string
      data: {
        lineItem: CartItem
      }
    }
  }
}

export type BigCommerceCheckoutOperation = {
  data: {
    site: {
      checkout: BigCommerceCheckout
    }
  }
  variables: {
    entityId: string
  }
}

export type BigCommerceProductOperation = {
  data: {
    site: {
      product: BigCommerceProduct
    }
  }
  variables: {
    productId: number
  }
}

export type BigCommerceProductsOperation = {
  data: {
    site: {
      products: Connection<BigCommerceProduct>
    }
  }
  variables: {
    entityIds: number[] | []
  }
}

export type BigCommerceEntityIdOperation = {
  data: {
    site: {
      route: {
        node: {
          __typename:
            | "Product"
            | "Category"
            | "Brand"
            | "NormalPage"
            | "ContactPage"
            | "RawHtmlPage"
            | "BlogIndexPage"
          entityId: number
        }
      }
    }
  }
  variables: {
    path: string
  }
}

export type BigCommerceRecommendationsOperation = {
  data: {
    site: {
      product: {
        relatedProducts: Connection<BigCommerceProduct>
      }
    }
  }
  variables: {
    productId: number | string
  }
}

export type BigCommerceSearchProductsOperation = {
  data: {
    site: {
      search: {
        searchProducts: {
          products: Connection<BigCommerceProduct>
        }
      }
    }
  }
  variables: {
    filters: {
      searchTerm: string
    }
    sort: string | null
  }
}

export type BigCommerceMenuOperation = {
  data: {
    site: {
      categoryTree: BigCommerceCategoryTreeItem[]
    }
  }
}

export type BigCommerceCollectionOperation = {
  data: {
    site: {
      category: BigCommerceCollection
    }
  }
  variables: {
    entityId: number
  }
}

export type BigCommerceProductsCollectionOperation = {
  data: {
    site: {
      category: {
        products: Connection<BigCommerceProduct>
      }
    }
  }
  variables: {
    entityId: number
    sortBy: string | null
    hideOutOfStock: boolean
    first: number
  }
}

export type BigCommerceNewestProductsOperation = {
  data: {
    site: {
      newestProducts: Connection<BigCommerceProduct>
    }
  }
  variables: {
    first: number
  }
}

export type BigCommerceFeaturedProductsOperation = {
  data: {
    site: {
      featuredProducts: Connection<BigCommerceProduct>
    }
  }
  variables: {
    first: number
  }
}

export type BigCommercePopularProductsOperation = {
  data: {
    site: {
      bestSellingProducts: Connection<BigCommerceProduct>
    }
  }
  variables: {
    first: number
  }
}

export type BigCommerceCollectionsOperation = {
  data: {
    site: {
      categoryTree: BigCommerceCategoryWithId[]
    }
  }
}

export type BigCommercePageOperation = {
  data: {
    site: {
      content: {
        page: BigCommercePage
      }
    }
  }
  variables: { entityId: number }
}

export type BigCommercePagesOperation = {
  data: {
    site: {
      content: {
        pages: Connection<BigCommercePage>
      }
    }
  }
}

export type BigCommerceCheckout = {
  subtotal: BigCommerceMoney
  grandTotal: BigCommerceMoney
  taxTotal: BigCommerceMoney
}

export type BigCommerceCategoryWithId = Omit<
  BigCommerceCollection,
  "description" | "seo" | "path"
>

export type BigCommerceSEO = {
  pageTitle: string
  metaDescription: string
  metaKeywords: string
}

export type BigCommerceCollection = {
  entityId: number
  name: string
  path: string
  description: string
  seo: BigCommerceSEO
}

export type BigCommerceCart = {
  entityId: string
  currencyCode: string
  isTaxIncluded: boolean
  baseAmount: BigCommerceMoney
  discountedAmount: BigCommerceMoney
  amount: BigCommerceMoney
  discounts: CartDiscount[]
  lineItems: CartLineItems
  createdAt: { utc: Date }
  updatedAt: { utc: Date }
  locale: string
}

export type CartLineItems = {
  physicalItems: DigitalOrPhysicalItem[]
  digitalItems: DigitalOrPhysicalItem[]
  customItems: CartCustomItem[]
  giftCertificates: CartGiftCertificate[]
  totalQuantity: number
}

type CartSelectedCheckboxOptionInput = {
  optionEntityId: number
  optionValueEntityId: number
}

type CartSelectedDateFieldOptionInput = {
  optionEntityId: number
  date: Date
}

type CartSelectedMultiLineTextFieldOptionInput = {
  optionEntityId: number
  text: string
}

type CartSelectedMultipleChoiceOptionInput = {
  optionEntityId: number
  optionValueEntityId: number
}

type CartSelectedNumberFieldOptionInput = {
  optionEntityId: number
  number: number
}

type CartSelectedTextFieldOptionInput = {
  optionEntityId: number
  text: string
}

export type CartSelectedOptionsInput = {
  checkboxes?: CartSelectedCheckboxOptionInput[]
  dateFields?: CartSelectedDateFieldOptionInput[]
  multiLineTextFields?: CartSelectedMultiLineTextFieldOptionInput[]
  multipleChoices?: CartSelectedMultipleChoiceOptionInput[]
  numberFields?: CartSelectedNumberFieldOptionInput[]
  textFields?: CartSelectedTextFieldOptionInput[]
}

export type CartItem = {
  quantity: number
  productEntityId: number
  variantEntityId?: number
  selectedOptions?: CartSelectedOptionsInput
}

export type BigCommerceCategoryTreeItem = {
  name: string
  path: string
  hasChildren: boolean
  entityId: number
  children?: BigCommerceCategoryTreeItem[]
}

export type BigCommercePage = {
  __typename:
    | "NormalPage"
    | "ContactPage"
    | "RawHtmlPage"
    | "BlogIndexPage"
  entityId: number
  name: string
  isVisibleInNavigation: boolean
  seo: BigCommerceSEO
  path: string
  plainTextSummary?: string
  htmlBody?: string
}

export type BigCommerceMoney = {
  value: number
  currencyCode: string
}

type CartDiscount = {
  entityId: string
  discountedAmount: BigCommerceMoney
}

type CartGiftCertificatePersonDetails = {
  name: string
  email: string
}

export type DigitalOrPhysicalItem = {
  entityId: number
  parentEntityId: number | null
  productEntityId: number
  variantEntityId: number | null
  sku: string
  name: string
  url: string
  imageUrl: string | null
  brand: string | null
  quantity: number
  isTaxable: boolean
  listPrice: BigCommerceMoney
  extendedListPrice: BigCommerceMoney
  selectedOptions: {
    entityId: number
    name: string
    value?: string
    date?: { utc: Date }
    text?: string
    number?: string
    fileName?: ScrollSetting
  }[]
  isShippingRequired: boolean
}

export type CartCustomItem = {
  entityId: string
  productEntityId: undefined
  sku: string
  name: string
  quantity: number
  listPrice: BigCommerceMoney
  extendedListPrice: BigCommerceMoney
}

type CartGiftCertificate = {
  entityId: number
  productEntityId: undefined
  name: string
  amount: BigCommerceMoney
  isTaxable: boolean
  message: string
  sender: CartGiftCertificatePersonDetails
  recipient: CartGiftCertificatePersonDetails
}

export type BigCommerceProductVariant = {
  id: number
  entityId: number
  sku: string
  upc: string | null
  isPurchasable: boolean
  prices: {
    price: BigCommerceMoney
    priceRange: {
      min: BigCommerceMoney
      max: BigCommerceMoney
    }
  }
  options: {
    edges: Array<{
      node: {
        entityId: number
        displayName: string
        values: {
          edges: Array<{
            node: {
              entityId: number
              label: string
            }
          }>
        }
      }
    }>
  }
}

export type BigCommerceProductOption = {
  __typename: string
  entityId: number
  displayName: string
  isRequired: boolean
  displayStyle: string
  values: {
    edges: Array<{
      node: {
        entityId: number
        label: string
        isDefault: boolean
        hexColors: string[]
        imageUrl: string | null
        isSelected: boolean
      }
    }>
  }
}

export type BigCommerceProduct = {
  id: number
  entityId: number
  sku: string
  upc: string | null
  name: string
  brand: {
    name: string
  } | null
  plainTextDescription: string
  description: string
  availabilityV2: {
    status: string
    description: string
  }
  defaultImage: {
    url: string
    altText: string
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string
      }
    }>
  }
  seo: BigCommerceSEO
  path: string
  prices: {
    price: BigCommerceMoney
    priceRange: {
      min: BigCommerceMoney
      max: BigCommerceMoney
    }
  }
  createdAt: {
    utc: Date
  }
  variants: Connection<BigCommerceProductVariant>
  productOptions: Connection<BigCommerceProductOption>
}

export type LineItem = {
  merchandiseId: string
  quantity: number
  productId?: string
  selectedOptions?: CartSelectedOptionsInput
}

export type BigCommerceOrder = {
  id: number
  customer_id: number
  date_created: string
  date_modified: string
  date_shipped: string
  status_id: number
  status: string
  subtotal_ex_tax: string
  subtotal_inc_tax: string
  subtotal_tax: string
  base_shipping_cost: string
  shipping_cost_ex_tax: string
  shipping_cost_inc_tax: string
  shipping_cost_tax: string
  shipping_cost_tax_class_id: number
  base_handling_cost: string
  handling_cost_ex_tax: string
  handling_cost_inc_tax: string
  handling_cost_tax: string
  handling_cost_tax_class_id: number
  base_wrapping_cost: string
  wrapping_cost_ex_tax: string
  wrapping_cost_inc_tax: string
  wrapping_cost_tax: string
  wrapping_cost_tax_class_id: number
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  items_total: number
  items_shipped: number
  payment_method: string
  payment_provider_id: string
  payment_status: string
  refunded_amount: string
  order_is_digital: boolean
  store_credit_amount: string
  gift_certificate_amount: string
  ip_address: string
  ip_address_v6: string
  geoip_country: string
  geoip_country_iso2: string
  currency_id: number
  currency_code: string
  currency_exchange_rate: string
  default_currency_id: number
  default_currency_code: string
  staff_notes: string
  customer_message: string
  discount_amount: string
  coupon_discount: string
  shipping_address_count: number
  is_deleted: boolean
  ebay_order_id: string
  cart_id: string
  billing_address: {
    first_name: string
    last_name: string
    company: string
    street_1: string
    street_2: string
    city: string
    state: string
    zip: string
    country: string
    country_iso2: string
    phone: string
    email: string
    form_fields: any[]
  }
  is_email_opt_in: boolean
  credit_card_type: string
  order_source: string
  channel_id: number
  external_source: string
  consignments: {
    url: string
    resource: string
  }
  // products: {
  //   url: string
  //   resource: string
  // }
  products: BigCommerceOrderProduct[]
  shipping_addresses: {
    url: string
    resource: string
  }
  coupons: {
    url: string
    resource: string
  }
  external_id: null | string
  external_merchant_id: null | string
  tax_provider_id: string
  customer_locale: string
  external_order_id: string
  store_default_currency_code: string
  store_default_to_transactional_exchange_rate: string
  custom_status: string
}

export type BigCommerceOrderProduct = {
  id: number
  order_id: number
  product_id: number
  variant_id: number
  order_pickup_method_id: number
  order_address_id: number
  name: string
  name_customer: string
  name_merchant: string
  sku: string
  upc: string
  type: string
  base_price: string
  price_ex_tax: string
  price_inc_tax: string
  price_tax: string
  base_total: string
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  weight: string
  width: string
  height: string
  depth: string
  quantity: number
  base_cost_price: string
  cost_price_inc_tax: string
  cost_price_ex_tax: string
  cost_price_tax: string
  is_refunded: boolean
  quantity_refunded: number
  refund_amount: string
  return_id: number
  wrapping_id: number
  wrapping_name: string
  base_wrapping_cost: string
  wrapping_cost_ex_tax: string
  wrapping_cost_inc_tax: string
  wrapping_cost_tax: string
  wrapping_message: string
  quantity_shipped: number
  event_name: string | null
  event_date: string
  fixed_shipping_cost: string
  ebay_item_id: string
  ebay_transaction_id: string
  option_set_id: number | null
  parent_order_product_id: number | null
  is_bundled_product: boolean
  bin_picking_number: string
  external_id: string | null
  fulfillment_source: string
  brand: string
  gift_certificate_id: string | null
  applied_discounts: any[]
  product_options: {
    id: number
    option_id: number
    order_product_id: number
    product_option_id: number
    display_name: string
    display_name_customer: string
    display_name_merchant: string
    display_value: string
    display_value_customer: string
    display_value_merchant: string
    value: string
    type: string
    name: string
    display_style: string
  }[]
  configurable_fields: any[]
  discounted_total_inc_tax: string
}

export type OrderStatus =
  | "Incomplete"
  | "Pending"
  | "Shipped"
  | "Partially Shipped"
  | "Refunded"
  | "Cancelled"
  | "Declined"
  | "Awaiting Payment"
  | "Awaiting Pickup"
  | "Awaiting Shipment"
  | "Completed"
  | "Awaiting Fulfillment"
  | "Manual Verification Required"
  | "Disputed"
  | "Partially Refunded"

export const STATUS_ID_MAP: { [key in OrderStatus]: number } = {
  Incomplete: 0,
  Pending: 1,
  Shipped: 2,
  "Partially Shipped": 3,
  Refunded: 4,
  Cancelled: 5,
  Declined: 6,
  "Awaiting Payment": 7,
  "Awaiting Pickup": 8,
  "Awaiting Shipment": 9,
  Completed: 10,
  "Awaiting Fulfillment": 11,
  "Manual Verification Required": 12,
  Disputed: 13,
  "Partially Refunded": 14,
}

type BigCommerceWebhookScope = "store/order/created"

type BigCommerceWebhookDataType = "order"

export type BigCommerceWebhookPayload = {
  producer: string
  hash: string
  created_at: number
  store_id: string
  scope: BigCommerceWebhookScope
  data: {
    type: BigCommerceWebhookDataType
    id: number
  }
}
