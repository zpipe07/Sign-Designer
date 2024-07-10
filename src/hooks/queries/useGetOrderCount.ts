import { useQuery } from "@tanstack/react-query"

export const useGetOrderCount = () => {
  const getOrderCount = async () => {
    const res = await fetch(`/api/v1/admin/orders/count`)
    const data = await res.json()

    return data
  }

  return useQuery({
    queryKey: ["/api/v1/admin/orders/count"],
    queryFn: getOrderCount,
  })
}
