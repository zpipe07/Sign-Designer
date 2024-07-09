import { useQuery } from "@tanstack/react-query"

export const useGetOrders = (page: number) => {
  const getOrders = async () => {
    const res = await fetch(`/api/v1/admin/orders?page=${page}`)
    const data = await res.json()

    return data
  }

  return useQuery({
    queryKey: ["/api/v1/admin/orders", page],
    queryFn: getOrders,
  })
}
