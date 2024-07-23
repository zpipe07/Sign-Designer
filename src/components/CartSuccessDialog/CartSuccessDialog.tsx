import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"

import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { CartView } from "@/src/components/Cart/CartView"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CartSuccessDialog: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const theme = useTheme()

  const { data } = useGetCart()

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Item successfully added to cart!</DialogTitle>

      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            {data?.cart && <CartView cart={data.cart} />}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">Subtotal</Typography>
            <Typography>
              ${data?.cart?.cost.subtotalAmount.amount}
            </Typography>
            <Typography marginBottom={1} variant="body2">
              Shipping & taxes calculated at checkout
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column",
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          href={data?.cart?.checkoutUrl}
          sx={{
            marginBottom: 1,

            [theme.breakpoints.up("sm")]: {
              marginBottom: 0,
            },
          }}
        >
          Checkout now
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          onClick={() => onClose()}
        >
          Continue shopping
        </Button>
      </DialogActions>
    </Dialog>
  )
}
