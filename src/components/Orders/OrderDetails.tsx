import Typography from "@mui/material/Typography"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"
import { OrderDetailsRow } from "@/src/components/Orders/OrderDetailsRow"

export const OrderDetails: React.FC<{ order: BigCommerceOrder }> = ({
  order,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell>Options</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products.map((product) => {
            return (
              <OrderDetailsRow
                key={product.id}
                product={product}
                order={order}
              />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
