import { useQuery } from "@tanstack/react-query"

export const useGetOrders = () => {
  const getOrders = async () => {
    const res = await fetch("/api/v1/admin/orders")
    const data = await res.json()

    return data
  }

  return useQuery({
    queryKey: ["/api/v1/admin/orders"],
    queryFn: getOrders,
  })
}
