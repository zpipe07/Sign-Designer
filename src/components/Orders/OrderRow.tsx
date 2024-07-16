import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"

import { OrderDetails } from "@/src/components/Orders/OrderDetails"
import { OrderStatusSelect } from "@/src/components/Orders/OrderStatusSelect"
import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

export const OrderRow: React.FC<{ order: BigCommerceOrder }> = ({
  order,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow key={order.id}>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.date_created}</TableCell>
        <TableCell>
          <OrderStatusSelect order={order} />
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
            <OrderDetails order={order} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
