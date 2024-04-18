import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CartView } from "@/src/components/Header/Cart/CartView"

export const Cart: React.FC = () => {
  const { data: cart, isLoading } = useGetCart(
    "0a98b86b-2d20-4610-a160-d1366fffd65a",
  )

  if (isLoading) {
    return null
  }

  return <CartView cart={cart} />
}
