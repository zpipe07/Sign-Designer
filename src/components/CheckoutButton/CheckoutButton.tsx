import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useGetCheckout } from "@/src/hooks/queries/useGetCheckout"

export const CART_ID = "dac81236-2ddd-47dc-853b-c5f3a2567ab2"

export const CheckoutButton: React.FC = () => {
  const { data: checkout, isLoading } = useGetCheckout(CART_ID)

  if (isLoading) {
    return null
  }

  if (!checkout?.data?.embedded_checkout_url) {
    return (
      <Typography>
        There was an error generating the checkout URL
      </Typography>
    )
  }

  return (
    <Button
      variant="contained"
      href={checkout.data.embedded_checkout_url}
      fullWidth
    >
      View Cart
    </Button>
  )
}
