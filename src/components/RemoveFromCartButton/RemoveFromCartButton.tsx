import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Alert, CircularProgress } from "@mui/material"

import { useRemoveFromCart } from "@/src/hooks/mutations/useRemoveFromCart"

type Props = {
  cartId: string
  lineItemId: string
}

export const RemoveFromCartButton: React.FC<Props> = ({
  cartId,
  lineItemId,
}) => {
  const {
    mutate: removeFromCart,
    isPending,
    error,
  } = useRemoveFromCart()

  return (
    <>
      <IconButton
        disabled={isPending}
        onClick={() => {
          removeFromCart({ cartId, lineItemId })
        }}
      >
        {isPending ? <CircularProgress /> : <DeleteIcon />}
      </IconButton>

      {error && (
        <Alert severity="error" sx={{ marginTop: 1 }}>
          There was an error. Please try again.
        </Alert>
      )}
    </>
  )
}
