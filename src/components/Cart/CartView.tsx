import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Box from "@mui/material/Box"

import { VercelCart } from "@/src/lib/bigcommerce/types"
import { CheckoutButton } from "@/src/components/CheckoutButton"
import { CartItemRow } from "@/src/components/Cart/CartItemRow"

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
              <TableCell>Item</TableCell>
              <TableCell></TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.lines.map((lineItem) => {
              return (
                <CartItemRow
                  lineItem={lineItem}
                  cart={cart}
                  key={lineItem.id}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
