"use client"

import { useSearchParams } from "next/navigation"
import { Container } from "@mui/material"

import { SignDesigner } from "@/src/components/SignDesigner"
import { SignDetails } from "@/src/components/SignDetails"
import { parseSearchParams } from "@/src/utils"

export default function Page() {
  const searchParams = useSearchParams()

  const params = parseSearchParams(searchParams)

  return (
    <Container>
      <SignDesigner {...params} />

      <SignDetails />
    </Container>
  )
}
