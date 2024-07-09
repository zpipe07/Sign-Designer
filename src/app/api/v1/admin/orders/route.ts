import { type NextRequest } from "next/server"
import queryString from "query-string"

import { PAGE_LIMIT } from "@/src/app/api/v1/admin/orders/count/route"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page") || "1"

  const qs = queryString.stringify({
    sort: "date_created:desc",
    page,
    limit: PAGE_LIMIT.toString(),
    is_deleted: false,
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

  return Response.json({ orders })
}
