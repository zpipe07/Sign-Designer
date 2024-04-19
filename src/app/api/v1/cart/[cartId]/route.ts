import { addToCart } from "@/src/lib/bigcommerce"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const body = await request.json()
  const cart = await addToCart(params.cartId, body.lineItems)

  return Response.json({ cart })
}
