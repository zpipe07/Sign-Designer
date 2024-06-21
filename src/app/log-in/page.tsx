import Typography from "@mui/material/Typography"

import { LogInForm } from "@/src/components/LogInForm"

export default function LogIn({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <>
      <Typography component="h1" variant="h3">
        Log in
      </Typography>

      <LogInForm />

      {searchParams?.message && (
        <Typography variant="h5" marginBottom={2}>
          {searchParams.message}
        </Typography>
      )}
    </>
  )
}
