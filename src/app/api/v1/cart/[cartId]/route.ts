import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { addToCart } from "@/src/lib/bigcommerce"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const res = await fetch("http://localhost:3000/api/v1/products/112")
  const data = await res.json()
  const productOptionsMap = createProductOptionsMap(data.product)
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(
    formData,
    productOptionsMap,
  )
  const cart = await addToCart(params.cartId, [lineItem])

  return Response.json({ cart })
}
