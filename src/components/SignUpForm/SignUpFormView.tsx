"use client"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { Form } from "@/src/components/Form"

type Props = { onSubmit(formData: FormData): any }

export type FormValues = {
  email: string
  password: string
}

export const SignUpFormView: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Form
      action={onSubmit}
      inputComponents={[
        <TextField type="email" name="email" key="email" fullWidth />,
        <TextField
          type="password"
          name="password"
          key="password"
          fullWidth
        />,
      ]}
      actionComponents={[
        <Button
          variant="contained"
          type="submit"
          key="sign up"
          fullWidth
        >
          Sign up
        </Button>,
      ]}
    />
  )
}
