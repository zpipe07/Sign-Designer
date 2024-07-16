import {
  BigCommerceOrder,
  BigCommerceOrderProduct,
  BigCommerceWebhookPayload,
} from "@/src/lib/bigcommerce/types"

export async function POST(request: Request) {
  const body: BigCommerceWebhookPayload = await request.json()
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/${body.data.id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-Auth-Token": process.env.ORDERS_ACCESS_TOKEN!,
      },
      cache: "no-store",
    },
  )
  const order: BigCommerceOrder = await res.json()
  // console.log({ order })
  const productsRes = await fetch(order.products.url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Auth-Token": process.env.ORDERS_ACCESS_TOKEN!,
    },
    cache: "no-store",
  })
  const products: BigCommerceOrderProduct[] = await productsRes.json()
  console.log({ products })

  products.forEach((product) => {
    console.log("product_options", product.product_options)
  })

  // create order in our system

  return Response.json({ status: "ok" })
}

// /api/v1/webhooks/bigcommerce/orders/created
// https://sign-designer.vercel.app/api/v1/webhooks/bigcommerce/orders/created

// POST https://api.bigcommerce.com/stores/dh8nzctx6e/v3/hooks
// X-Auth-Token: epmvjeckmcqziy8iap0qomdtnduzc95
// Content-Type: application/json
// Accept: application/json
// {
//   "scope": "store/order/created",
//   "destination": "https://sign-designer.vercel.app/api/v1/webhooks/bigcommerce/orders/created",
//   "is_active": true,
//   "headers": {}
// }

// payload
// {
//   producer: 'stores/dh8nzctx6e',
//   hash: '1bc82bf2892e33912d3abf5eb38cebd825b6a3e8',
//   created_at: 1721150877,
//   store_id: '1003171542',
//   scope: 'store/order/created',
//   data: { type: 'order', id: 134 }
// }
