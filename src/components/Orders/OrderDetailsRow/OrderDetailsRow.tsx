import { IconButton, Skeleton } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import DownloadIcon from "@mui/icons-material/Download"

import {
  ColorCombo,
  EdgeStyle,
  FontFamily,
  MountingStyle,
  Shape,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import {
  BigCommerceOrder,
  BigCommerceOrderProduct,
} from "@/src/lib/bigcommerce/types"

type Props = {
  product: BigCommerceOrderProduct
  order: BigCommerceOrder
}

export const OrderDetailsRow: React.FC<Props> = ({
  product,
  order,
}) => {
  const shape = product.product_options.find(
    ({ display_name }) => display_name === "shape",
  )?.display_value as Shape
  const size = product.product_options.find(
    ({ display_name }) => display_name === "size",
  )?.display_value as Size
  const color = product.product_options.find(
    ({ display_name }) => display_name === "color",
  )?.display_value as ColorCombo
  const fontFamily = product.product_options.find(
    ({ display_name }) => display_name === "font",
  )?.display_value as FontFamily
  const mountingStyle = product.product_options.find(
    ({ display_name }) => display_name === "mounting_style",
  )?.display_value as MountingStyle
  const edgeStyle = product.product_options.find(
    ({ display_name }) => display_name === "edge_style",
  )?.display_value as EdgeStyle
  const borderWidth = product.product_options.find(
    ({ display_name }) => display_name === "border_width",
  )?.display_value!
  const textLines = JSON.parse(
    product.product_options.find(
      ({ display_name }) => display_name === "text_lines",
    )?.display_value || "[]",
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

  const fileName = `${order.id}-${product.id}-${color}.svg`
  const downloadHref = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${fileName}?download=`

  return (
    <TableRow>
      <TableCell>
        {order.id}-{product.id}
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell align="center">
        {isLoading ? (
          <Skeleton variant="rectangular" height={50} />
        ) : (
          svg && (
            <Box
              dangerouslySetInnerHTML={{ __html: svg }}
              sx={{
                display: "inline-block",
                maxWidth: 75,

                svg: {
                  maxHeight: 100,
                },
              }}
            />
          )
        )}
      </TableCell>
      <TableCell>
        <Box component="dl" sx={{ padding: 0, margin: 0 }}>
          <Box component="dt" sx={{ padding: 0, margin: 0 }}>
            <strong>Color</strong>
          </Box>
          <Box component="dd" sx={{ padding: 0, margin: 0 }}>
            {color}
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        <IconButton
          href={downloadHref}
          download
          sx={{ border: "1px solid" }}
        >
          <DownloadIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
