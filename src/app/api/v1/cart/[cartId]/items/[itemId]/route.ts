import { cookies } from "next/headers"

import { removeFromCart, updateCart } from "@/src/lib/bigcommerce"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export async function DELETE(
  _request: Request,
  { params }: { params: { cartId: string; itemId: string } },
) {
  const cart = await removeFromCart(params.cartId, [params.itemId])

  if (!cart) {
    cookies().delete("cartId")
  }

  return Response.json({ cart })
}

export async function PATCH(
  request: Request,
  { params }: { params: { cartId: string; itemId: string } },
) {
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(formData)
  const cart = await updateCart(params.cartId, [
    { ...lineItem, id: params.itemId },
  ])

  return Response.json({ cart })
}
