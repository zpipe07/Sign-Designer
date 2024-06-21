import queryString from "query-string"
import { createClient } from "@/src/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    return new Response(error.message, { status: 500 })
  }

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

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
    },
  )
  const orders = await res.json()

  return Response.json({ orders })
}
