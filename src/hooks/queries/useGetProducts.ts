import { useQuery } from "@tanstack/react-query"

import { BigCommerceOrderProduct } from "@/src/lib/bigcommerce/types"

export const useGetProducts = (orderId: number) => {
  const getProducts = async () => {
    const res = await fetch(
      `/api/v1/admin/orders/${orderId}/products`,
    )
    const data = await res.json()

    return data
  }

  return useQuery<{ products: BigCommerceOrderProduct[] }>({
    queryKey: [`/api/v1/admin/orders/${orderId}/products`],
    queryFn: getProducts,
  })
}
