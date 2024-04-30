"use client"

import { FormProvider, useForm } from "react-hook-form"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: undefined,
      orientation: undefined,
      size: undefined,
      textLines: undefined,
      color: undefined,
      fontFamily: undefined,
      decoration: undefined,
    },
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
