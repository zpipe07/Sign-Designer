import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CartView } from "@/src/components/Header/Cart/CartView"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart()

  if (isLoading) {
    return null
  }

  return <CartView cart={data?.cart} />
}
