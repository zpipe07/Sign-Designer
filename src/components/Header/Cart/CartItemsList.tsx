import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"

import { CartLineItems } from "@/src/lib/bigcommerce/types"

type Props = {
  lineItems: CartLineItems
}

export const CartItemsList: React.FC<Props> = ({ lineItems }) => {
  return (
    <List disablePadding>
      {lineItems.physicalItems.map(
        ({ entityId, name, listPrice }) => {
          return (
            <ListItem key={entityId} disablePadding>
              <Typography>{name}</Typography>&nbsp;
              <Typography>${listPrice.value}</Typography>
            </ListItem>
          )
        },
      )}
    </List>
  )
}
