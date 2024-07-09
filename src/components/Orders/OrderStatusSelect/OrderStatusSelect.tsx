import { Select, SelectChangeEvent } from "@mui/material"

import {
  OrderStatus,
  orderStatuses,
} from "@/src/app/api/v1/admin/orders/[orderId]/route"
import { useUpdateOrder } from "@/src/hooks/mutations/useUpdateOrder"
import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

export const OrderStatusSelect: React.FC<{
  order: BigCommerceOrder
}> = ({ order }) => {
  const { mutate } = useUpdateOrder()

  const handleStatusChange = (event: SelectChangeEvent<any>) => {
    mutate({
      orderId: order.id,
      updateData: { status: event.target.value as OrderStatus },
    })
  }

  return (
    <Select
      variant="outlined"
      defaultValue={order.status}
      onChange={handleStatusChange}
      native
    >
      {orderStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  )
}
