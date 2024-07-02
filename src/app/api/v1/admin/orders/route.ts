import queryString from "query-string"

export async function GET() {
  const qs = queryString.stringify({
    sort: "date_created:desc",
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
