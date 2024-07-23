import { BIGCOMMERCE_API_URL } from "./constants"

export type StorefrontCheckoutData = {
  cart_url: string
  checkout_url: string
  embedded_checkout_url: string
}

export interface StorefrontCheckoutResponse {
  data?: StorefrontCheckoutData
  status: number
}

type CheckoutCache = {
  activeCartId: string | null
  data: StorefrontCheckoutResponse | null
}

const createCartRedirectUrl = () => {
  const localCache: CheckoutCache = {
    activeCartId: null,
    data: null,
  }

  return async (
    cartId: string,
  ): Promise<StorefrontCheckoutResponse> => {
    if (localCache.activeCartId !== cartId || !localCache.data) {
      const response = await fetch(
        `${BIGCOMMERCE_API_URL}/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/carts/${cartId}/redirect_urls`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-auth-token": process.env.CARTS_ACCESS_TOKEN!,
          },
        },
      )
      const data =
        (await response.json()) as StorefrontCheckoutResponse

      localCache.activeCartId = cartId
      localCache.data = data

      return data
    }

    return localCache.data
  }
}

export const memoizedCartRedirectUrl = createCartRedirectUrl()
