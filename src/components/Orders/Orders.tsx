"use client"

import Typography from "@mui/material/Typography"

import { useGetOrders } from "@/src/hooks/queries/useGetOrders"
import { OrdersView } from "@/src/components/Orders/OrdersView"

export const Orders: React.FC = () => {
  const { data, isLoading, isError } = useGetOrders()

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  // console.log({ data })

  return (
    <>
      <Typography variant="h4" component="h2">
        Orders
      </Typography>

      <OrdersView orders={data.orders} />
    </>
  )
}
