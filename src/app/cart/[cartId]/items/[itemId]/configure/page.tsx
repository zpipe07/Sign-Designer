import Typography from "@mui/material/Typography"

import { SignConfigurer } from "@/src/components/SignConfigurer"

export default function Page() {
  return (
    <>
      <Typography variant="h3" component="h1" marginBottom={4}>
        Edit
      </Typography>

      <SignConfigurer isEditing />
    </>
  )
}
