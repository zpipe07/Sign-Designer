"use client"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { Form } from "@/src/components/Form"
import Box from "@mui/material/Box"

type Props = { onSubmit(formData: FormData): any; buttonText: string }

export type FormValues = {
  email: string
  password: string
}

export const SignUpFormView: React.FC<Props> = ({
  onSubmit,
  buttonText,
}) => {
  return (
    <Box sx={{ maxWidth: 400, paddingTop: 2, paddingBottom: 2 }}>
      <Form
        action={onSubmit}
        inputComponents={[
          <TextField
            type="email"
            name="email"
            label="Email"
            key="email"
            fullWidth
          />,
          <TextField
            type="password"
            name="password"
            label="Password"
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
            {buttonText}
          </Button>,
        ]}
      />
    </Box>
  )
}
