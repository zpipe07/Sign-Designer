"use client"

import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import { SignDesignerForm } from "@/src/components/SignDesigner/SignDesignerForm"
import { SignDesignerVisualizer } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizer"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

type Props = {
  isEditing?: boolean
}

export const SignDesigner: React.FC<Props> = ({ isEditing }) => {
  const theme = useTheme()

  const { data } = useGetProduct(112)

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
        <SignDesignerForm isEditing={isEditing} />
      </Grid>
    </Grid>
  )
}
