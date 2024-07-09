"use client"

import { useState } from "react"
import Typography from "@mui/material/Typography"
import { Box, CircularProgress } from "@mui/material"

import { useGetOrders } from "@/src/hooks/queries/useGetOrders"
import { OrdersView } from "@/src/components/Orders/OrdersView"
import { OrderPagination } from "@/src/components/Orders/OrderPagination"

export const Orders: React.FC = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useGetOrders(page)

  return (
    <>
      <Typography variant="h4" component="h2" marginBottom={2}>
        Orders
      </Typography>

      <OrderPagination page={page} setPage={setPage} />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <OrdersView orders={data.orders} />
      )}

      <OrderPagination page={page} setPage={setPage} />
    </>
  )
}
