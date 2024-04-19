import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useGetCart } from "@/src/hooks/queries/useGetCart"

export const CheckoutButton: React.FC = () => {
  const { data, isLoading } = useGetCart()

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
