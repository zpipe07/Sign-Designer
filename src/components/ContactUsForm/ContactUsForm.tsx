"use client"

import { useForm } from "react-hook-form"
import TextField from "@mui/material/TextField"
import { Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab"

import { useSendEmail } from "@/src/hooks/mutations/useSendEmail"

export type FormData = {
  name: string
  email: string
  message: string
}

export const ContactUsForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const { mutate, isPending } = useSendEmail()

  const onSubmit = (data: FormData) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register("message")}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={isPending}
            sx={{ minWidth: 250 }}
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}
