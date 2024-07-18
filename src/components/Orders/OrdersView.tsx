import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Typography } from "@mui/material"

import { OrderRow } from "@/src/components/Orders/OrderRow"
import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

type Props = {
  orders: BigCommerceOrder[]
}

export const OrdersView: React.FC<Props> = ({ orders }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.length ? (
            orders.map((order) => {
              return <OrderRow key={order.id} order={order} />
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography sx={{ textAlign: "center" }}>
                  No orders found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
