"use client"
import { FormProvider, useForm } from "react-hook-form"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

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
  const theme = useTheme()

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              [theme.breakpoints.up("md")]: {
                position: "sticky",
                top: theme.spacing(2),
              },
            }}
          >
            <SignDesignerVisualizer />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <SignDesignerForm />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
