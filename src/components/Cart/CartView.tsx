import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"

import { VercelCart } from "@/src/lib/bigcommerce/types"
import { CheckoutButton } from "@/src/components/CheckoutButton"

type Props = {
  cart: VercelCart
}

export const CartView: React.FC<Props> = ({ cart }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          {cart.lines.map(({ id, merchandise, cost, quantity }) => {
            return (
              <TableRow key={id}>
                <TableCell>{merchandise.title}</TableCell>
                <TableCell>${cost.totalAmount.amount}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>${cost.totalAmount.amount}</TableCell>
              </TableRow>
            )
          })}
        </Table>
      </TableContainer>

      <Typography variant="h4">Subtotal</Typography>
      <Typography>${cart.cost.subtotalAmount.amount}</Typography>
      <Typography>Shipping & taxes calculated at checkout</Typography>

      <CheckoutButton />
    </>
  )
}
