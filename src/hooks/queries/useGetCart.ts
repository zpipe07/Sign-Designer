// import useSWR from "swr"

// import { fetcher } from "@/src/utils/fetcher"
// import { VercelCart } from "@/src/lib/bigcommerce/types"
import { useQuery } from "@tanstack/react-query"

export const useGetCart = () => {
  // return useSWR<{ cart: VercelCart | undefined }>(
  //   "/api/v1/cart",
  //   fetcher,
  // )
  const getCart = async () => {
    const res = await fetch("/api/v1/cart")
    const cart = await res.json()

    return cart
  }

  return useQuery({ queryKey: ["/api/v1/cart"], queryFn: getCart })
}
