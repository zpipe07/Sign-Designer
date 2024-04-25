import { cookies } from "next/headers"

import { addToCart, getCart } from "@/src/lib/bigcommerce"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export async function POST(request: Request) {
  // create cart and set cartID cookie
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(formData)
  const cart = await addToCart(undefined, [lineItem])

  cookies().set("cartId", cart.id)

  return Response.json({ cart })
}

export async function PUT(request: Request) {
  // read cartId cookie and update cart
  const formData: DesignFormInputs = await request.json()
  const cartId = cookies().get("cartId")?.value
  const lineItem = await formDataToCartItem(formData)
  const cart = await addToCart(cartId, [lineItem])

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
