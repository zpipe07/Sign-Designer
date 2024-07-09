"use client"

import { useState } from "react"
import Typography from "@mui/material/Typography"

import { useGetOrders } from "@/src/hooks/queries/useGetOrders"
import { OrdersView } from "@/src/components/Orders/OrdersView"
import { OrderPagination } from "@/src/components/Orders/OrderPagination"

export const Orders: React.FC = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useGetOrders(page)

  return (
    <>
      <Typography variant="h4" component="h2">
        Orders
      </Typography>

      <OrderPagination
        page={page}
        setPage={setPage}
        pages={data?.pages}
      />

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <OrdersView orders={data.orders} />
      )}
    </>
  )
}
