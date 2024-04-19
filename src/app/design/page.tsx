import Typography from "@mui/material/Typography"

import { SignDesigner } from "@/src/components/SignDesigner"

export default function Page() {
  return (
    <>
      <Typography variant="h3" component="h1" marginBottom={4}>
        Design your sign
      </Typography>

      <SignDesigner />
    </>
  )
}
