import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useGetCheckout } from "@/src/hooks/queries/useGetCheckout"

export const CheckoutButton: React.FC = () => {
  const { data: checkout, isLoading } = useGetCheckout(
    "0a98b86b-2d20-4610-a160-d1366fffd65a",
  )

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
