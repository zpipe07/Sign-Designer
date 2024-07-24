"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { parseSearchParams } from "@/src/utils"

export const SignDesignerSearchParams: React.FC<{
  children: React.ReactElement<DesignFormInputs>
}> = ({ children }) => {
  const searchParams = useSearchParams()

  const params = parseSearchParams(searchParams)

  return <>{React.cloneElement(children, params)}</>
}
