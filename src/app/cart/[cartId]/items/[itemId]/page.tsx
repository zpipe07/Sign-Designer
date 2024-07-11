"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useFormContext } from "react-hook-form"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { SignDesigner } from "@/src/components/SignDesigner"

export default function Page() {
  const { setValue } = useFormContext()

  const params = useParams<{ cartId: string; itemId: string }>()

  const { data, isLoading } = useGetCart()

  useEffect(() => {
    const cartItem = data?.cart?.lines.find(
      ({ id }) => id === params.itemId,
    )

    if (cartItem) {
      const selectedOptions = cartItem?.merchandise.selectedOptions
      const shape = selectedOptions?.find(
        ({ name }) => name === "shape",
      )?.value
      const orientation = selectedOptions?.find(
        ({ name }) => name === "orientation",
      )?.value
      const size = selectedOptions?.find(
        ({ name }) => name === "size",
      )?.value
      const textLine = selectedOptions?.find(
        ({ name }) => name === "textLine",
      )?.value
      const font = selectedOptions?.find(
        ({ name }) => name === "font",
      )?.value
      const color = selectedOptions?.find(
        ({ name }) => name === "color",
      )?.value

      setValue("shape", shape)
      setValue("orientation", orientation)
      setValue("size", size)
      setValue("textLines", [{ value: textLine }])
      setValue("fontFamily", font)
      setValue("color", color)
    }
  }, [data?.cart?.lines, params.itemId, setValue])

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
    <>
      {/* <Typography variant="h3" component="h1" marginBottom={2}>
        Edit item
      </Typography> */}

      <SignDesigner isEditing />
    </>
  )
}
