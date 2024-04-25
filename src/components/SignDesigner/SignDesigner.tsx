"use client"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { SignDesignerVisualizer } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizer"
// import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
// import { signProductId } from "@/src/lib/bigcommerce/mappers"

export const SignDesigner: React.FC = () => {
  const theme = useTheme()

  // const { data } = useGetProduct(signProductId)
  // console.log({ data })

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
