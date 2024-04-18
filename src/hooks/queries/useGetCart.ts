import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"
import { BigCommerceCart } from "@/src/lib/bigcommerce/types"

export const useGetCart = (cartId: string) => {
  return useSWR<BigCommerceCart>(`/api/v1/cart/${cartId}`, fetcher)
}
