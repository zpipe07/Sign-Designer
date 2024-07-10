import { Select, SelectChangeEvent } from "@mui/material"

import { useUpdateOrder } from "@/src/hooks/mutations/useUpdateOrder"
import {
  BigCommerceOrder,
  OrderStatus,
} from "@/src/lib/bigcommerce/types"
import { orderStatuses } from "@/src/lib/bigcommerce/constants"

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
