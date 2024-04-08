"use client"
import { FormProvider, useForm } from "react-hook-form"
import Grid from "@mui/material/Grid"

import {
  ColorCombo,
  Decoration,
  FontFamily,
  Orientation,
  Shape,
  SignDesignerForm,
  Size,
  TextLine,
  colorCombos,
} from "@/src/components/SignDesigner/SignDesignerForm"
import { SignDesignerVisualizer } from "@/src/components/SignDesigner/SignDesignerVisualizer"

export type DesignFormInputs = {
  shape: Shape
  orientation: Orientation
  size: Size
  textLines: TextLine[]
  color: ColorCombo
  fontFamily: FontFamily
  decoration: Decoration | ""
}

export const SignDesigner = () => {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: "rectangle",
      orientation: "horizontal",
      size: "small",
      textLines: [{ value: "" }, { value: "" }, { value: "" }],
      color: colorCombos[0],
      fontFamily: "Times",
      decoration: "",
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <SignDesignerForm />
        </Grid>

        <Grid item xs={12} md={6}>
          <SignDesignerVisualizer />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
