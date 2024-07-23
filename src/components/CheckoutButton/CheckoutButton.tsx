import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { useGetCheckout } from "@/src/hooks/queries/useGetCheckout"

export const CheckoutButton: React.FC = () => {
  const { data, isLoading } = useGetCart()

  const { data: checkoutData, isLoading: isLoadingCheckout } =
    useGetCheckout(data?.cart?.id)

  if (isLoading || isLoadingCheckout) {
    return null
  }

  if (!checkoutData?.data?.checkout_url) {
    return (
      <Typography>
        There was an error generating the checkout URL
      </Typography>
    )
  }

  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      href={checkoutData.data.checkout_url}
    >
      Checkout now
    </Button>
  )
}
