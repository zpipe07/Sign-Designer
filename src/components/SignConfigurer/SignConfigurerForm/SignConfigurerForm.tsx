"use client"
import { useFormContext } from "react-hook-form"
import Link from "next/link"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  MountingSelector,
  SidesSelector,
} from "@/src/components/SignConfigurer"

export const SignConfigurerForm = () => {
  const theme = useTheme()

  const { handleSubmit } = useFormContext()

  const onSubmit = (data: any) => {
    console.log({ data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SidesSelector />
        </Grid>

        <Grid item xs={12}>
          <MountingSelector />
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Button
            component={Link}
            href="/design"
            variant="outlined"
            size="large"
            sx={{ marginRight: theme.spacing(1) }}
          >
            Back
          </Button>

          <Button variant="contained" size="large" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
