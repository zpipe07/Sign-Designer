"use client"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { CartView } from "@/src/components/Cart/CartView"
import { useGetCart } from "@/src/hooks/queries/useGetCart"

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

  return <CartView cart={data.cart} />
}
