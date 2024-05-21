"use client"

import { FormProvider, useForm } from "react-hook-form"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: "rectangle",
      size: "extra large",
      color: "black/white",
      textLines: [{ value: "Your" }, { value: "Text goes here" }],
      orientation: "horizontal",
      // fontFamily: "times",
      // decoration: "",
    },
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
