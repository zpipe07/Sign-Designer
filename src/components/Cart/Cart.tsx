"use client"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { CartView } from "@/src/components/Cart/CartView"
import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CheckoutButton } from "@/src/components/CheckoutButton"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!data?.cart) {
    return (
      <Typography variant="h6" marginBottom={2}>
        Your cart is empty
      </Typography>
    )
  }

  return (
    <>
      <CartView cart={data.cart} />

      <Box marginTop={2} marginBottom={2} textAlign="right">
        <Typography variant="h5">Subtotal</Typography>
        <Typography>
          ${data.cart.cost.subtotalAmount.amount}
        </Typography>
        <Typography marginBottom={1} variant="body2">
          Shipping & taxes calculated at checkout
        </Typography>

        <CheckoutButton />
      </Box>
    </>
  )
}
