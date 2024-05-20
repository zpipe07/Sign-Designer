"use client"

import Grid from "@mui/material/Grid"

import { SignDesignerVisualizer } from "@/src/components/SignDesignerVisualizer"
import { SignConfigurerForm } from "@/src/components/SignConfigurer"
import { PriceDisplay } from "@/src/components/PriceDisplay"

type Props = {
  isEditing?: boolean
}

export const SignConfigurer: React.FC<Props> = ({ isEditing }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <SignDesignerVisualizer />

        <PriceDisplay />
      </Grid>

      <Grid item xs={12} md={6}>
        <SignConfigurerForm isEditing={isEditing} />
      </Grid>
    </Grid>
  )
}
