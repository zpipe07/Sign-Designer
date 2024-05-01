// import useSWR from "swr"

// import { fetcher } from "@/src/utils/fetcher"
// import { StorefrontCheckoutResponse } from "@/src/lib/bigcommerce/storefront-config"
import { useQuery } from "@tanstack/react-query"

export const useGetCheckout = (cartId: string) => {
  // return useSWR<StorefrontCheckoutResponse>(
  //   `/api/v1/cart/${cartId}/checkout`,
  //   fetcher,
  //   {
  //     revalidateOnMount: false,
  //   },
  // )
  const getCheckout = async () => {
    const res = await fetch(`/api/v1/cart/${cartId}/checkout`)
    const checkout = await res.json()

    return checkout
  }

  return useQuery({
    queryKey: [`/api/v1/cart/${cartId}/checkout`],
    queryFn: getCheckout,
  })
}
