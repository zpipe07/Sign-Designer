import Image from "next/image"
import Link from "next/link"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { VercelCart } from "@/src/lib/bigcommerce/types"
import { CheckoutButton } from "@/src/components/CheckoutButton"
import { useRemoveFromCart } from "@/src/hooks/mutations/useRemoveFromCart"

type Props = {
  cart: VercelCart
}

export const CartView: React.FC<Props> = ({ cart }) => {
  const { mutate: removeFromCart } = useRemoveFromCart()

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell></TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.lines.map(({ id, merchandise, cost, quantity }) => {
              const fileId = merchandise.selectedOptions.find(
                ({ name }) => name === "file_id",
              )?.value!
              const imgSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileId}--with-fill.svg`

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Typography>{merchandise.title}</Typography>

                    {/* <Typography variant="body2">
                      <strong>Shape: </strong>
                      {
                        merchandise.selectedOptions.find(
                          ({ name }) => name === "shape_modifier",
                        )?.value
                      }
                    </Typography> */}

                    <Typography variant="body2">
                      <strong>Size: </strong>
                      {
                        merchandise.selectedOptions.find(
                          ({ name }) => name === "size",
                        )?.value
                      }
                    </Typography>

                    <Image
                      src={imgSrc}
                      alt=""
                      width={100}
                      height={100}
                    />

                    {/* <Typography variant="body2">
                      <strong>Color: </strong>
                      {
                        merchandise.selectedOptions.find(
                          ({ name }) => name === "color",
                        )?.value
                      }
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      href={`/cart/${cart.id}/items/${id}`}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => {
                        removeFromCart({
                          cartId: cart.id,
                          lineItemId: id,
                        })
                      }}
                    >
                      Remove from cart
                    </Button>
                  </TableCell>
                  <TableCell>${cost.totalAmount.amount}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>${cost.totalAmount.amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box marginTop={2} marginBottom={2} textAlign="right">
        <Typography variant="h5">Subtotal</Typography>
        <Typography>${cart.cost.subtotalAmount.amount}</Typography>
        <Typography marginBottom={1} variant="body2">
          Shipping & taxes calculated at checkout
        </Typography>

        <CheckoutButton />
      </Box>
    </>
  )
}
