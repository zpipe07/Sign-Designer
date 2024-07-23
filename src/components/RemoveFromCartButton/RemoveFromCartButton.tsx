import DeleteIcon from "@mui/icons-material/Delete"
import { Alert } from "@mui/material"

import { useRemoveFromCart } from "@/src/hooks/mutations/useRemoveFromCart"
import { LoadingButton } from "@mui/lab"

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
      <LoadingButton
        loading={isPending}
        onClick={() => {
          removeFromCart({ cartId, lineItemId })
        }}
      >
        <DeleteIcon />
      </LoadingButton>

      {error && (
        <Alert severity="error" sx={{ marginTop: 1 }}>
          There was an error. Please try again.
        </Alert>
      )}
    </>
  )
}
