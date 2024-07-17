import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { addToCart, getProduct } from "@/src/lib/bigcommerce"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const product = await getProduct("112")

  if (!product) {
    throw new Error("Product not found")
  }

  const productOptionsMap = createProductOptionsMap(product)
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(
    formData,
    product,
    // productOptionsMap,
  )
  console.log({ ...lineItem.selectedOptions })
  const cart = await addToCart(params.cartId, [lineItem])

  return Response.json({ cart })
}
