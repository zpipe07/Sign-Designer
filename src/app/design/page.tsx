"use client"

import { useSearchParams } from "next/navigation"

import { SignDesigner } from "@/src/components/SignDesigner"
import { SignDetails } from "@/src/components/SignDetails"
import { parseSearchParams } from "@/src/utils"

export default function Page() {
  const searchParams = useSearchParams()

  const params = parseSearchParams(searchParams)

  return (
    <>
      <SignDesigner {...params} />

      <SignDetails />
    </>
  )
}
