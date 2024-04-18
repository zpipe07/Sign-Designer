import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"

export const useGetCart = (cartId: string) => {
  return useSWR(`/api/v1/cart/${cartId}`, fetcher)
}
