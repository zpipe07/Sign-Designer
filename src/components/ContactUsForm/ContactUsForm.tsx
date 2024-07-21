"use client"

import { useForm } from "react-hook-form"
import TextField from "@mui/material/TextField"
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
    console.log(data)
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("name")}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email")}
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        {...register("message")}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        loading={isPending}
      >
        Send
      </LoadingButton>
    </form>
  )
}
