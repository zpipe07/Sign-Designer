import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { createCartMutation } from "@/src/lib/bigcommerce/mutations/cart"
import { BigCommerceCreateCartOperation } from "@/src/lib/bigcommerce/types"

export async function POST(request: Request) {
  // create cart
  const body = await request.json()
  const res = await bigCommerceFetch<BigCommerceCreateCartOperation>({
    query: createCartMutation,
    variables: {
      createCartInput: {
        lineItems: body.lineItems,
      },
    },
  })
  const cart = res.body.data.cart.createCart.cart

  return Response.json({ cart })
}
