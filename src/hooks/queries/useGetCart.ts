import { useQuery } from "@tanstack/react-query"

import { VercelCart } from "@/src/lib/bigcommerce/types"

export const useGetCart = () => {
  const getCart = async () => {
    const res = await fetch("/api/v1/cart")
    const cart = await res.json()

    return cart
  }

  return useQuery<{ cart: VercelCart | undefined }>({
    queryKey: ["/api/v1/cart"],
    queryFn: getCart,
  })
}
