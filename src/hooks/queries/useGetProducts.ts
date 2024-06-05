import { useQuery } from "@tanstack/react-query"

export const useGetProducts = (orderId: number) => {
  const getProducts = async () => {
    const res = await fetch(
      `/api/v1/admin/orders/${orderId}/products`,
    )
    const data = await res.json()

    return data
  }

  return useQuery({
    queryKey: [`/api/v1/admin/orders/${orderId}/products`],
    queryFn: getProducts,
  })
}
