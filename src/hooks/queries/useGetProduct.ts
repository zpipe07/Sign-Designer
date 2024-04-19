import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"

export const useGetProduct = (productId: number) => {
  return useSWR(`/api/v1/products/${productId}`, fetcher)
}
