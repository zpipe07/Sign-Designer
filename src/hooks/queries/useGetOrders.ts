import { useQuery } from "@tanstack/react-query"

import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

export const useGetOrders = (page: number) => {
  const getOrders = async () => {
    const res = await fetch(`/api/v1/admin/orders?page=${page}`)
    const data = await res.json()

    return data
  }

  return useQuery<{ orders: BigCommerceOrder[] }>({
    queryKey: ["/api/v1/admin/orders", page],
    queryFn: getOrders,
  })
}
