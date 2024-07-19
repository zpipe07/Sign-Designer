import { NextRequest } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: { productId: string; variantId: string } },
) {
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/catalog/products/${params.productId}/variants/${params.variantId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-Auth-Token": process.env.PRODUCTS_ACCESS_TOKEN!,
      },
      cache: "no-store",
    },
  )
  const { data: variant } = await res.json()

  return Response.json({ variant })
}
