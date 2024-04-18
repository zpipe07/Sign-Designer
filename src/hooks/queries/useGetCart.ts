import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useGetCart = (cartId: string) => {
  return useSWR(`/api/v1/cart/${cartId}`, fetcher)
}
