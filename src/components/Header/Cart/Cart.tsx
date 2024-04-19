import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CartView } from "@/src/components/Header/Cart/CartView"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart(
    "ebed58ae-9ec9-47b0-8ac4-ca7e90658228",
  )

  if (isLoading) {
    return null
  }

  return <CartView cart={data?.cart} />
}
