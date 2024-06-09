import { cookies } from "next/headers"

import { addToCart, getCart, getProduct } from "@/src/lib/bigcommerce"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"

export async function POST(request: Request) {
  // create cart and set cartID cookie

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
  const cart = await addToCart(undefined, [lineItem])

  cookies().set("cartId", cart.id)

  return Response.json({ cart })
}

// export async function PUT(request: Request) {
//   // read cartId cookie and update cart
//   const res = await fetch("http://localhost:3000/api/v1/products/112")
//   const data = await res.json()
//   const productOptionsMap = createProductOptionsMap(data.product)
//   const formData: DesignFormInputs = await request.json()
//   const cartId = cookies().get("cartId")?.value
//   const lineItem = await formDataToCartItem(
//     formData,
//     productOptionsMap,
//   )
//   const cart = await addToCart(cartId, [lineItem])

//   return Response.json({ cart })
// }

export async function GET(_request: Request) {
  // read cartId cookie and get cart
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    return Response.json({ cart: undefined })
  }

  const cart = await getCart(cartId)

  return Response.json({ cart })
}
