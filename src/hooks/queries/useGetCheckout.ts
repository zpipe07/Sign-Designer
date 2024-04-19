import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"
import { StorefrontCheckoutResponse } from "@/src/lib/bigcommerce/storefront-config"

export const useGetCheckout = (cartId: string) => {
  return useSWR<StorefrontCheckoutResponse>(
    `/api/v1/cart/${cartId}/checkout`,
    fetcher,
    {
      revalidateOnMount: false,
    },
  )
}
