import { useSWRConfig } from "swr"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

import { VercelCart } from "@/src/lib/bigcommerce/types"

type Props = {
  cart: VercelCart
}

export const CartItemsList: React.FC<Props> = ({ cart }) => {
  const { mutate } = useSWRConfig()

  const removeFromCart = async (
    cartId: string,
    lineItemId: string,
  ) => {
    const res = await fetch(
      `/api/v1/cart/${cartId}/items/${lineItemId}`,
      {
        method: "DELETE",
      },
    )
    const cart = await res.json()

    mutate(`/api/v1/cart/${cartId}`, { cart })
  }

  return (
    <List disablePadding>
      {cart.lines.map(({ id, merchandise, cost }) => {
        return (
          <ListItem key={id} disablePadding>
            <Typography>{merchandise.title}</Typography>&nbsp;
            <Typography>${cost.totalAmount.amount}</Typography>
            <IconButton
              sx={{ marginLeft: "auto" }}
              onClick={() => {
                removeFromCart(cart.id, id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        )
      })}
    </List>
  )
}
