"use client"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { SignDesignerVisualizer } from "@/src/components/SignDesigner/SignDesignerVisualizer"

export const SignDesigner = () => {
  const theme = useTheme()

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
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <SignDesignerForm />
      </Grid>
    </Grid>
  )
}
