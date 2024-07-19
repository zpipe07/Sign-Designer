import { useQuery } from "@tanstack/react-query"

import { VercelProductVariant } from "@/src/lib/bigcommerce/types"

export const useGetProductVariant = (
  productId: number,
  variantId?: string,
) => {
  const getProductVariant = async () => {
    const res = await fetch(
      `/api/v1/products/${productId}/variants/${variantId}`,
    )
    const data = await res.json()

    return data
  }

  return useQuery<{
    productVariant: VercelProductVariant
  }>({
    queryKey: [`/api/v1/products/${productId}/variants/${variantId}`],
    queryFn: getProductVariant,
  })
}
