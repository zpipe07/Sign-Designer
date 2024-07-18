import { NextRequest } from "next/server"
import queryString from "query-string"

import { PAGE_LIMIT } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const statusId = searchParams.get("status_id")
  const qs = queryString.stringify({
    is_deleted: false,
    ...(statusId && { status_id: statusId }),
  })
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/count?${qs}`,
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
  const { count } = await res.json()
  const pages = Math.ceil(count / PAGE_LIMIT)

  return Response.json({ count, pages })
}
