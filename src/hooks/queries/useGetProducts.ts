import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useGetProducts = () => {
  return useSWR("/api/v1/products", fetcher)
}
