import { removeFromCart } from "@/src/lib/bigcommerce"

export async function DELETE(
  _request: Request,
  { params }: { params: { cartId: string; itemId: string } },
) {
  const cart = await removeFromCart(params.cartId, [params.itemId])

  return Response.json({ cart })
}
