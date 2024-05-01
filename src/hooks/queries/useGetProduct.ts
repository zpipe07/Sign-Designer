import { useQuery } from "@tanstack/react-query"

import { VercelProduct } from "@/src/lib/bigcommerce/types"

export const useGetProduct = (productId: number) => {
  const getProduct = async () => {
    const res = await fetch(`/api/v1/products/${productId}`)
    const product = await res.json()

    return product
  }

  return useQuery<{ product: VercelProduct }>({
    queryKey: [`/api/v1/products/${productId}`],
    queryFn: getProduct,
  })
}
