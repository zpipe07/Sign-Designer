import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { addToCart, addToCartRest } from "@/src/lib/bigcommerce"
import { BIGCOMMERCE_API_URL } from "@/src/lib/bigcommerce/constants"
import {
  formDataToCartItem,
  formDataToCartItemRest,
} from "@/src/lib/bigcommerce/mappers"
import { LineItem } from "@/src/lib/bigcommerce/types"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(formData)
  // const lineItem = await formDataToCartItemRest(formData)
  const cart = await addToCart(params.cartId, [lineItem])
  // const cart = await addToCartRest(params.cartId, [lineItem])
  console.log({ cart })
  const foo = await updateLineItem(params.cartId, cart.lines[0])
  console.log({ foo })

  return Response.json({ cart })
}

const updateLineItem = async (cartId: string, lineItem: any) => {
  // const formData: DesignFormInputs = await request.json()
  // const lineItem = await formDataToCartItemRest(formData)
  // const cart = await addToCartRest(params.cartId, [lineItem])
  // return Response.json({ cart })
  console.log({ lineItem })
  const checkoutId = cartId
  const res = await fetch(
    // `${BIGCOMMERCE_API_URL}/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/carts/${params.cartId}/redirect_urls`
    // `https://store-dh8nzctx6e.mybigcommerce.com/api/storefront/checkouts/${checkoutId}/carts/${cartId}/items/${lineItem.id}`,
    `${BIGCOMMERCE_API_URL}/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/checkouts/${checkoutId}/carts/${cartId}/items/${lineItem.id}`,
    {
      // method: "PUT",
      // method: "PATCH",
      method: "POST",
      body: JSON.stringify({ lineItem }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        // "x-auth-token": process.env.BIGCOMMERCE_ACCESS_TOKEN!,
        "X-Auth-Token": "6l56fg1g0g49mqdnursxjos1p7r1vnq",
      },
    },
  )
  console.log({ res })
  const data = await res.json()
  return data
}
