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
import { AddressBarUpdater } from "@/src/components/SignDesigner/AddressBarUpdater"

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
      size: size || "large",
      color: color || "black/white",
      fontFamily: fontFamily || "BreeSerif",
      mountingStyle: mountingStyle || "wall mounted",
      edgeStyle: "square",
      borderWidth: "0.2",
      textLines: textLines?.length
        ? textLines
        : [
            { value: "", fontSize: "2" },
            { value: "", fontSize: "2" },
            { value: "", fontSize: "2" },
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
          <Grid
            item
            xs={12}
            md={7}
            lg={8}
            sx={{
              alignSelf: "flex-start",
              position: "sticky",
              top: theme.spacing(0),
              zIndex: 9999,
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
                <SignVisualizer />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={5} lg={4}>
            <SignDesignerForm isEditing={isEditing} />
          </Grid>
        </Grid>
      </Box>

      <AddressBarUpdater />
    </FormProvider>
  )
}
