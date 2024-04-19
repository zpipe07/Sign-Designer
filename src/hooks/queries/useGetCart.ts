import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"
import { VercelCart } from "@/src/lib/bigcommerce/types"

export const useGetCart = (cartId: string) => {
  return useSWR<{ cart: VercelCart | undefined }>(
    `/api/v1/cart/${cartId}`,
    fetcher,
  )
}
