"use client"
import { useFormContext } from "react-hook-form"
import Grid from "@mui/material/Grid"

import { SidesSelector } from "@/src/components/SignConfigurer"

export const SignConfigurerForm = () => {
  const { handleSubmit } = useFormContext()

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SidesSelector />
        </Grid>

        <Grid item xs={12}>
          {/*  */}
        </Grid>
      </Grid>
    </form>
  )
}
