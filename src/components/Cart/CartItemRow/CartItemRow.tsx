import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { Box, Skeleton } from "@mui/material"

import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { RemoveFromCartButton } from "@/src/components/RemoveFromCartButton"
import {
  VercelCart,
  VercelCartItem,
} from "@/src/lib/bigcommerce/types"
import {
  ColorCombo,
  EdgeStyle,
  FontFamily,
  MountingStyle,
  Shape,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"

type Props = {
  lineItem: VercelCartItem
  cart: VercelCart
}

export const CartItemRow: React.FC<Props> = ({ lineItem, cart }) => {
  const shape = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "shape",
  )?.value as Shape
  const size = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "size",
  )?.value as Size
  const color = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "color",
  )?.value as ColorCombo
  const fontFamily = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "font",
  )?.value as FontFamily
  const mountingStyle = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "mounting_style",
  )?.value as MountingStyle
  const edgeStyle = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "edge_style",
  )?.value as EdgeStyle
  const borderWidth = lineItem.merchandise.selectedOptions.find(
    ({ name }) => name === "border_width",
  )?.value!
  const textLines = JSON.parse(
    lineItem.merchandise.selectedOptions.find(
      ({ name }) => name === "text_lines",
    )?.value!,
  ) as TextLine[]
  const inputs = {
    shape,
    size,
    color,
    fontFamily,
    mountingStyle,
    edgeStyle,
    borderWidth,
    textLines,
  }
  const { data: svg, isLoading } = useGetSignSvg(inputs)

  return (
    <TableRow>
      <TableCell>
        <Typography variant="h6">
          {lineItem.merchandise.title}
        </Typography>

        {isLoading && <Skeleton variant="rectangular" height={140} />}

        {svg && (
          <Box
            dangerouslySetInnerHTML={{ __html: svg }}
            sx={{
              maxWidth: 150,

              svg: {
                maxHeight: 150,
              },
            }}
          />
        )}
      </TableCell>

      <TableCell>
        <RemoveFromCartButton
          cartId={cart.id}
          lineItemId={lineItem.id}
        />
      </TableCell>

      <TableCell>{lineItem.cost.totalAmount.amount}</TableCell>
      <TableCell>{lineItem.quantity}</TableCell>
      <TableCell>
        $
        {parseFloat(lineItem.cost.totalAmount.amount) *
          lineItem.quantity}
      </TableCell>
    </TableRow>
  )
}
