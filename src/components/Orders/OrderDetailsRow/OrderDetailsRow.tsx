"use client"

import { useEffect, useState } from "react"
import { IconButton, Skeleton } from "@mui/material"
import Box from "@mui/material/Box"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import DownloadIcon from "@mui/icons-material/Download"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

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
import { createClient } from "@/src/utils/supabase/client"
import { useCreateOrderSvg } from "@/src/hooks/mutations/useCreateOrderSvg"
import { getFilename } from "@/src/utils"

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
  const filename = getFilename(order.id, product.id, color, textLines)
  const downloadHref = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/signs/${filename}?download=`

  const supabase = createClient()

  const [fileExists, setFileExists] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("signs")
        .createSignedUrl(filename, 1)

      setFileExists(!!data?.signedUrl)
    }

    fetchData()
  }, [supabase, filename])

  const onSuccess = () => {
    setFileExists(true)
  }

  const { mutate, isPending } = useCreateOrderSvg({ onSuccess })

  const handleClick = async () => {
    mutate({
      shape,
      size,
      color,
      fontFamily,
      mountingStyle,
      edgeStyle,
      borderWidth,
      textLines,
      orderId: order.id,
      productId: product.id,
    })
  }

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
        {fileExists ? (
          <IconButton
            href={downloadHref}
            download
            sx={{ border: "1px solid" }}
          >
            <DownloadIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleClick}
            disabled={isPending}
            sx={{
              border: "1px solid",

              "&:disabled": { opacity: 0.75 },
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}
