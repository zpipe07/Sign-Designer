"use client"

import { useParams } from "next/navigation"
import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { SignDesigner } from "@/src/components/SignDesigner"
import { Container } from "@mui/material"
import {
  ColorCombo,
  DesignFormInputs,
  EdgeStyle,
  FontFamily,
  MountingStyle,
  Shape,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"

export default function Page() {
  const params = useParams<{ cartId: string; itemId: string }>()

  const { data, isLoading } = useGetCart()

  const cartItem = data?.cart?.lines.find(
    ({ id }) => id === params.itemId,
  )

  const selectedOptions = cartItem?.merchandise.selectedOptions
  const inputs: DesignFormInputs = {
    shape: selectedOptions?.find(({ name }) => name === "shape")
      ?.value as Shape,
    size: selectedOptions?.find(({ name }) => name === "size")
      ?.value as Size,
    textLines: JSON.parse(
      selectedOptions?.find(({ name }) => name === "text_lines")
        ?.value || "[]",
    ) as TextLine[],
    fontFamily: selectedOptions?.find(({ name }) => name === "font")
      ?.value as FontFamily,
    color: selectedOptions?.find(({ name }) => name === "color")
      ?.value as ColorCombo,
    mountingStyle: selectedOptions?.find(
      ({ name }) => name === "mounting_style",
    )?.value as MountingStyle,
    edgeStyle: selectedOptions?.find(
      ({ name }) => name === "edge_style",
    )?.value as EdgeStyle,
    borderWidth: selectedOptions?.find(
      ({ name }) => name === "border_width",
    )?.value!,
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container>
      <SignDesigner isEditing {...inputs} />
    </Container>
  )
}
