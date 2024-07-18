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
    <>
      <Typography variant="h6">Products</Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Actions</TableCell>
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
    </>
  )
}
