"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Typography from "@mui/material/Typography"
import { Alert, Box, CircularProgress } from "@mui/material"

import { useGetOrders } from "@/src/hooks/queries/useGetOrders"
import { OrdersView } from "@/src/components/Orders/OrdersView"
import { OrderPagination } from "@/src/components/Orders/OrderPagination"
import { OrdersFiltersForm } from "@/src/components/Orders/OrdersFiltersForm"

export const Orders: React.FC = () => {
  const [page, setPage] = useState(1)

  const searchParams = useSearchParams()
  const statusId = searchParams.get("status_id")

  const { data, isLoading, error } = useGetOrders({ page, statusId })

  if (error) {
    return (
      <Alert severity="error" sx={{ marginBottom: 2 }}>
        There was an error fetching orders.
      </Alert>
    )
  }

  return (
    <>
      <Typography variant="h4" component="h2" marginBottom={2}>
        Orders
      </Typography>

      <OrdersFiltersForm />
      {/* <OrdersFilters /> */}

      <OrderPagination page={page} setPage={setPage} />

      {isLoading || !data ? (
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
    </>
  )
}
