import Image from "next/image"
import Typography from "@mui/material/Typography"
import {
  Alert,
  Box,
  Button,
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {order.id}-{product.id}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {product.product_options.map((option: any) => {
                      if (option.display_name === "file_id") {
                        const fileId = option.display_value
                        const imgSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileId}--with-fill.svg`
                        const addIdToFileName =
                          new Date(
                            "Tue, 16 Jul 2024 18:42:51 +0000",
                          ).getTime() <=
                          new Date(order.date_created).getTime()
                        const fileName = addIdToFileName
                          ? `${order.id}-${product.id}-${fileId}--path-only.svg`
                          : `${fileId}--path-only.svg`
                        const downloadHref = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileName}?download=`

                        return (
                          <Box
                            key={option.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              src={imgSrc}
                              alt=""
                              width={150}
                              height={150}
                            />

                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              href={downloadHref}
                              sx={{ marginLeft: 1 }}
                              download
                            >
                              Download file
                            </Button>
                          </Box>
                        )
                      }
                      return null
                      // <Typography key={option.id}>
                      //   {option.display_name}:{" "}
                      //   {option.display_value}
                      // </Typography>
                    })}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
