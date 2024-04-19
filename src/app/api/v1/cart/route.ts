import { cookies } from "next/headers"

import { addToCart, getCart } from "@/src/lib/bigcommerce"

export async function POST(request: Request) {
  // create cart and set cartID cookie
  const body = await request.json()
  const cart = await addToCart(undefined, body.lineItems)

  cookies().set("cartId", cart.id)

  return Response.json({ cart })
}

export async function PUT(request: Request) {
  // read cartId cookie and update cart
  const body = await request.json()
  const cartId = cookies().get("cartId")?.value
  const cart = await addToCart(cartId, body.lineItems)

  return Response.json({ cart })
}

export async function GET(_request: Request) {
  // read cartId cookie and get cart
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    return Response.json({ cart: undefined })
  }

  const cart = await getCart(cartId)

  return Response.json({ cart })
}
