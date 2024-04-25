import useSWR from "swr"

import { fetcher } from "@/src/utils/fetcher"
import { VercelProduct } from "@/src/lib/bigcommerce/types"

export const useGetProduct = (productId: number) => {
  return useSWR<{ product: VercelProduct }>(
    `/api/v1/products/${productId}`,
    fetcher,
  )
}
