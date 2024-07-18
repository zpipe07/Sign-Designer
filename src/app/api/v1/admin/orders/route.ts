import { type NextRequest } from "next/server"
import queryString from "query-string"

// import { PAGE_LIMIT } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page") || "1"
  const statusId = searchParams.get("status_id")
  const color = searchParams.get("color")

  const qs = queryString.stringify({
    sort: "date_created:desc",
    page,
    // limit: PAGE_LIMIT.toString(),
    is_deleted: false,
    ...(statusId && { status_id: statusId }),
  })
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders?${qs}`,
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

  let orders: BigCommerceOrder[] = []

  if (res.status === 200) {
    orders = await res.json()
  }

  for (const order of orders) {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/${order.id}/products`,
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
    const products = await res.json()

    order.products = products

    if (color) {
      order.products = order.products.filter((product) => {
        return (
          product.product_options.find((option) => {
            return option.display_value === color
          })?.display_value === color
        )
      })
    }
  }

  if (color) {
    orders = orders.filter((order) => {
      return order.products.length > 0
    })
  }

  return Response.json({ orders })
}
