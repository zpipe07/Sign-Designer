"use client"

import { FormProvider, useForm } from "react-hook-form"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { colorCombos } from "@/src/components/SignDesigner/SignDesignerForm"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      // shape: "rectangle",
      // orientation: "horizontal",
      // size: "medium",
      // textLines: [{ value: "Your" }, { value: "Text goes here" }],
      // color: colorCombos[0],
      // fontFamily: "times",
      // decoration: "",
    },
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
