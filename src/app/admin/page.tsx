import Typography from "@mui/material/Typography"

import { Orders } from "@/src/components/Orders"

export default function Page() {
  return (
    <>
      <Typography variant="h3" component="h1">
        Admin
      </Typography>

      <Orders />
    </>
  )
}
