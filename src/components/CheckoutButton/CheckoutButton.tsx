import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useGetCart } from "@/src/hooks/queries/useGetCart"

export const CART_ID = "dac81236-2ddd-47dc-853b-c5f3a2567ab2"

export const CheckoutButton: React.FC = () => {
  const { data, isLoading } = useGetCart(CART_ID)

  if (isLoading) {
    return null
  }

  if (!data?.cart?.checkoutUrl) {
    return (
      <Typography>
        There was an error generating the checkout URL
      </Typography>
    )
  }

  return (
    <Button
      variant="contained"
      href={data.cart.checkoutUrl}
      fullWidth
    >
      View Cart
    </Button>
  )
}
