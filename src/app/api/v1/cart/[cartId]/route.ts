import { addToCart, getCart } from "@/src/lib/bigcommerce"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } },
) {
  const cart = await getCart(params.cartId)

  return Response.json({ cart })
}

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const body = await request.json()
  const cart = await addToCart(params.cartId, body.lineItems)

  return Response.json({ cart })
}
