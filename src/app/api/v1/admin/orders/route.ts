import { type NextRequest } from "next/server"
import queryString from "query-string"

const PAGE_LIMIT = 10

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page") || "1"
  const countRes = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/count`,
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
  const { count } = await countRes.json()
  const pages = Math.ceil(count / PAGE_LIMIT)
  console.log({ count, pages })

  const qs = queryString.stringify({
    sort: "date_created:desc",
    page,
    limit: PAGE_LIMIT.toString(),
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
  const orders = await res.json()

  return Response.json({ orders, count, pages })
}
