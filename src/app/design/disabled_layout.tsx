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
      color: "black::white",
      textLines: [
        // { value: "123" },
        { value: "" },
        // { value: "Main Street" },
        { value: "" },
        // { value: "The Smith's" },
        { value: "" },
      ],
      // orientation: "horizontal",
      fontFamily: "BreeSerif",
      // decoration: "",
      mountingStyle: "wall mounted",
    },
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
