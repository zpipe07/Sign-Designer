import queryString from "query-string"

export const PAGE_LIMIT = 5

export async function GET() {
  const qs = queryString.stringify({
    is_deleted: false,
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
