import Typography from "@mui/material/Typography"

import { useGetProducts } from "@/src/hooks/queries/useGetProducts"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export const OrderDetails: React.FC<{ orderId: number }> = ({
  orderId,
}) => {
  const { data, isLoading, isError } = useGetProducts(orderId)
  console.log({ data, isLoading, isError })

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      <Typography>Products</Typography>

      {data.products.map((product) => {
        return (
          <TableContainer key={product.id}>
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
                <TableRow>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {product.product_options.map((option) => {
                      if (option.display_name === "svgFile") {
                        return (
                          <Typography key={option.id}>
                            {option.display_name}:{" "}
                            <img
                              src={option.display_value}
                              alt="SVG file"
                            />
                          </Typography>
                        )
                      }
                      return (
                        <Typography key={option.id}>
                          {option.display_name}:{" "}
                          {option.display_value}
                        </Typography>
                      )
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )
      })}
    </>
  )
}
