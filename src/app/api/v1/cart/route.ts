import { addToCart } from "@/src/lib/bigcommerce"

export async function POST(request: Request) {
  const body = await request.json()

  const cart = await addToCart(undefined, body.lineItems)

  return Response.json({ cart })
}
