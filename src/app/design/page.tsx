"use client"
import Typography from "@mui/material/Typography"

import { SignDesigner } from "@/src/components/SignDesigner"
import { useGetProducts } from "@/src/hooks/queries/useGetProducts"

export default function Page() {
  const { data, isLoading } = useGetProducts()
  console.log({ data, isLoading })

  return (
    <>
      <Typography variant="h3" component="h1" marginBottom={4}>
        Design your sign
      </Typography>

      <SignDesigner />
    </>
  )
}
