import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { addToCart, addToCartRest } from "@/src/lib/bigcommerce"
import {
  formDataToCartItem,
  formDataToCartItemRest,
} from "@/src/lib/bigcommerce/mappers"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const formData: DesignFormInputs = await request.json()
  // const lineItem = await formDataToCartItem(formData)
  const lineItem = await formDataToCartItemRest(formData)
  // const cart = await addToCart(params.cartId, [lineItem])
  const cart = await addToCartRest(params.cartId, [lineItem])

  return Response.json({ cart })
}
