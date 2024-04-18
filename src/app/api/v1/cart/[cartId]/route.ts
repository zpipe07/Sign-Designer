import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { addCartLineItemMutation } from "@/src/lib/bigcommerce/mutations/cart"
import { getCartQuery } from "@/src/lib/bigcommerce/queries/cart"
import {
  BigCommerceAddToCartOperation,
  BigCommerceCartOperation,
} from "@/src/lib/bigcommerce/types"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } },
) {
  // get cart
  const res = await bigCommerceFetch<BigCommerceCartOperation>({
    query: getCartQuery,
    variables: { entityId: params.cartId },
    cache: "no-store",
  })

  const cart = res.body.data.site.cart

  if (!cart) {
    return undefined
  }

  return Response.json(cart)
}

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  // add item to cart
  const body = await request.json()
  const res = await bigCommerceFetch<BigCommerceAddToCartOperation>({
    query: addCartLineItemMutation,
    variables: {
      addCartLineItemsInput: {
        cartEntityId: params.cartId,
        data: {
          lineItems: body.lineItems,
        },
      },
    },
    cache: "no-store",
  })
  const cart = res.body.data.cart.addCartLineItems.cart

  return Response.json({ cart })
}
