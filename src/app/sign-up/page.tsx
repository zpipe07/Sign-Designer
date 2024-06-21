import Typography from "@mui/material/Typography"

import { SignUpForm } from "@/src/components/SignUpForm"

export default function SignUp() {
  return (
    <>
      <Typography component="h1" variant="h3">
        Sign up
      </Typography>

      <SignUpForm />
    </>
  )
}
