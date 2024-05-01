import { useQuery } from "@tanstack/react-query"

import { StorefrontCheckoutResponse } from "@/src/lib/bigcommerce/storefront-config"

export const useGetCheckout = (cartId: string) => {
  const getCheckout = async () => {
    const res = await fetch(`/api/v1/cart/${cartId}/checkout`)
    const checkout = await res.json()

    return checkout
  }

  return useQuery<StorefrontCheckoutResponse>({
    queryKey: [`/api/v1/cart/${cartId}/checkout`],
    queryFn: getCheckout,
  })
}
