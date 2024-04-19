import { BIGCOMMERCE_API_URL } from "@/src/lib/bigcommerce/constants"
import { StorefrontCheckoutResponse } from "@/src/lib/bigcommerce/storefront-config"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } },
) {
  const response = await fetch(
    `${BIGCOMMERCE_API_URL}/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/carts/${params.cartId}/redirect_urls`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-auth-token": process.env.BIGCOMMERCE_ACCESS_TOKEN!,
      },
    },
  )
  const data = (await response.json()) as StorefrontCheckoutResponse

  // localCache.activeCartId = cartId;
  // localCache.data = data;

  return Response.json(data)
}
