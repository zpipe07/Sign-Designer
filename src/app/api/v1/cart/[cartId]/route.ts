import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { addToCart } from "@/src/lib/bigcommerce"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const formData: DesignFormInputs = await request.json()
  const lineItem = formDataToCartItem(formData)
  const cart = await addToCart(params.cartId, [lineItem])

  return Response.json({ cart })
}
