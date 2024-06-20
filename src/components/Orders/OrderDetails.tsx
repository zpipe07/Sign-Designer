import Image from "next/image"
import Typography from "@mui/material/Typography"
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import { useGetProducts } from "@/src/hooks/queries/useGetProducts"

export const OrderDetails: React.FC<{ orderId: number }> = ({
  orderId,
}) => {
  const { data, isLoading, isError } = useGetProducts(orderId)

  if (isLoading) {
    return <Typography>Loading...</Typography>
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
            {data.products.map((product: any) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {product.product_options.map((option: any) => {
                      if (option.display_name === "file_id") {
                        const fileId = option.display_value
                        const imgSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileId}--with-fill.svg`
                        const downloadHref = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileId}--path-only.svg?download=`

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
