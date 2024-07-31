"use client"

import { FormProvider, useForm } from "react-hook-form"
import { Alert, Card, useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { SignVisualizer } from "@/src/components/SignVisualizer"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { AddressBarUpdater } from "@/src/components/SignDesigner/AddressBarUpdater"
import { DEFAULT_FORM_VALUES } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { SignVisualizerCarousel } from "@/src/components/SignVisualizerCarousel"

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
  edgeStyle,
  borderWidth,
}) => {
  const theme = useTheme()

  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: shape || DEFAULT_FORM_VALUES.shape,
      size: size || DEFAULT_FORM_VALUES.size,
      color: color || DEFAULT_FORM_VALUES.color,
      fontFamily: fontFamily || DEFAULT_FORM_VALUES.fontFamily,
      mountingStyle:
        mountingStyle || DEFAULT_FORM_VALUES.mountingStyle,
      edgeStyle: edgeStyle || DEFAULT_FORM_VALUES.edgeStyle,
      borderWidth: borderWidth || DEFAULT_FORM_VALUES.borderWidth,
      textLines: textLines?.length
        ? textLines
        : DEFAULT_FORM_VALUES.textLines,
    },
  })

  const { isLoading, error } = useGetProduct(112)

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

  if (error) {
    return (
      <Alert severity="error" variant="filled" sx={{ my: 4 }}>
        There was an error fetching the product.
      </Alert>
    )
  }

  return (
    <FormProvider {...formMethods}>
      <Box paddingTop={4} paddingBottom={4}>
        <Grid container spacing={{ xs: 3, lg: 4 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              alignSelf: "flex-start",
              position: "sticky",
              top: theme.spacing(-3),
              zIndex: 999,

              [theme.breakpoints.up("md")]: {
                top: theme.spacing(0),
              },
            }}
          >
            <Card
              elevation={3}
              sx={{
                padding: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  margin: "0 auto",

                  [theme.breakpoints.up("md")]: {
                    maxWidth: "none",
                  },
                }}
              >
                <SignVisualizerCarousel />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <SignDesignerForm isEditing={isEditing} />
          </Grid>
        </Grid>
      </Box>

      <AddressBarUpdater />
    </FormProvider>
  )
}
