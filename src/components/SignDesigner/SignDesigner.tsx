"use client"

import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { SignDesignerVisualizer } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizer"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { PriceDisplay } from "@/src/components/PriceDisplay"

type Props = {
  isEditing?: boolean
}

export const SignDesigner: React.FC<Props> = ({ isEditing }) => {
  const theme = useTheme()

  const { isLoading } = useGetProduct(112)

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
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

          <PriceDisplay />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <SignDesignerForm isEditing={isEditing} />
      </Grid>
    </Grid>
  )
}
