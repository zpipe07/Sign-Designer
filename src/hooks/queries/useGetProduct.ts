// import useSWR from "swr"

// import { fetcher } from "@/src/utils/fetcher"
// import { VercelProduct } from "@/src/lib/bigcommerce/types"
import { useQuery } from "@tanstack/react-query"

export const useGetProduct = (productId: number) => {
  // return useSWR<{ product: VercelProduct }>(
  //   `/api/v1/products/${productId}`,
  //   fetcher,
  // )
  const getProduct = async () => {
    const res = await fetch(`/api/v1/products/${productId}`)
    const product = await res.json()

    return product
  }

  return useQuery({
    queryKey: [`/api/v1/products/${productId}`],
    queryFn: getProduct,
  })
}
