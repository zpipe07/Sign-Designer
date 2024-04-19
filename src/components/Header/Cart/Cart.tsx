import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CartView } from "@/src/components/Header/Cart/CartView"
import { CART_ID } from "@/src/components/CheckoutButton"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart(CART_ID)

  if (isLoading) {
    return null
  }

  return <CartView cart={data?.cart} />
}
