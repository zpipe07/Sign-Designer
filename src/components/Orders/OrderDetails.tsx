import Typography from "@mui/material/Typography"
import {
  Alert,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import { useGetProducts } from "@/src/hooks/queries/useGetProducts"
import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"
import { OrderDetailsRow } from "@/src/components/Orders/OrderDetailsRow"

export const OrderDetails: React.FC<{ order: BigCommerceOrder }> = ({
  order,
}) => {
  const { data, isLoading, error } = useGetProducts(order.id)

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2 }}>
        There was an error fetching products for this order.
      </Alert>
    )
  }

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
            {data?.products.map((product) => {
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
