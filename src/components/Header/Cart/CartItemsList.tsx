import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"

import { VercelCart } from "@/src/lib/bigcommerce/types"
import { useRemoveFromCart } from "@/src/hooks/mutations/useRemoveFromCart"
import { RemoveFromCartButton } from "@/src/components/RemoveFromCartButton"

type Props = {
  cart: VercelCart
}

export const CartItemsList: React.FC<Props> = ({ cart }) => {
  const { mutate: removeFromCart } = useRemoveFromCart()

  return (
    <List disablePadding>
      {cart.lines.map(({ id, merchandise, cost }) => {
        const svg = merchandise.selectedOptions.find(
          ({ name }) => name === "svg",
        )

        return (
          <ListItem key={id} disablePadding>
            {svg?.value && (
              <div
                dangerouslySetInnerHTML={{ __html: svg.value }}
                style={{ width: "50px" }}
              />
            )}
            <Typography>{merchandise.title}</Typography>&nbsp;
            <Typography>${cost.totalAmount.amount}</Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <RemoveFromCartButton
                cartId={cart.id}
                lineItemId={id}
              />
            </Box>
          </ListItem>
        )
      })}
    </List>
  )
}
