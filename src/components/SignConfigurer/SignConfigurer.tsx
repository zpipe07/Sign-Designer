import Grid from "@mui/material/Grid"

import { SignDesignerVisualizer } from "@/src/components/SignDesignerVisualizer"
import { SignConfigurerForm } from "@/src/components/SignConfigurer"

export const SignConfigurer: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <SignDesignerVisualizer />
      </Grid>

      <Grid item xs={12} md={6}>
        <SignConfigurerForm />
      </Grid>
    </Grid>
  )
}
