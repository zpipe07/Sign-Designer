"use client"

import { CartView } from "@/src/components/Cart/CartView"
import { useGetCart } from "@/src/hooks/queries/useGetCart"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart()

  if (isLoading) {
    return null
  }

  if (!data?.cart) {
    return null
  }

  return <CartView cart={data.cart} />
}
