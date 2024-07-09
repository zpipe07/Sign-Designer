import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import { NativeSelect } from "@mui/material"

import { OrderDetails } from "@/src/components/Orders/OrderDetails"
import {
  OrderStatus,
  orderStatuses,
} from "@/src/app/api/v1/admin/orders/[orderId]/route"
import { useUpdateOrder } from "@/src/hooks/mutations/useUpdateOrder"

export const OrderRow: React.FC<{ order: any }> = ({ order }) => {
  const [open, setOpen] = useState(false)

  const { mutate } = useUpdateOrder()

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    mutate({
      orderId: order.id,
      updateData: { status: e.target.value as OrderStatus },
    })
  }

  return (
    <>
      <TableRow key={order.id}>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.date_created}</TableCell>
        <TableCell>
          <NativeSelect
            defaultValue={order.status}
            variant="filled"
            onChange={handleStatusChange}
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </NativeSelect>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#f9f9f9",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 10px 10px -6px inset, rgba(0, 0, 0, 0.1) 0px -10px 10px -6px inset",
          }}
          colSpan={6}
        >
          <Collapse in={open} mountOnEnter>
            <OrderDetails orderId={order.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
