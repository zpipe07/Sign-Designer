"use client"

import { FormProvider, useForm } from "react-hook-form"
import { Card, useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { SignVisualizer } from "@/src/components/SignVisualizer"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"

type Props = {
  isEditing?: boolean
} & Partial<DesignFormInputs>

export const SignDesigner: React.FC<Props> = ({
  isEditing,
  shape,
  size,
  color,
  textLines,
  fontFamily,
  mountingStyle,
}) => {
  const theme = useTheme()

  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: shape || "rectangle",
      size: size || "extra large",
      color: color || "black/white",
      fontFamily: fontFamily || "Albert",
      mountingStyle: mountingStyle || "wall mounted",
      textLines: textLines || [
        { value: "" },
        { value: "" },
        { value: "" },
      ],
    },
  })

  const { isLoading } = useGetProduct(112)

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <FormProvider {...formMethods}>
      <Box paddingTop={4} paddingBottom={4}>
        <Grid container spacing={{ xs: 3, lg: 4 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                [theme.breakpoints.up("md")]: {
                  position: "sticky",
                  top: theme.spacing(2),
                },
              }}
            >
              <Card elevation={3} sx={{ padding: 2 }}>
                {/* <SignDesignerVisualizer /> */}
                <SignVisualizer />
              </Card>

              {/* <PriceDisplay /> */}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <SignDesignerForm isEditing={isEditing} />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}
