import Typography from "@mui/material/Typography"
import { Container } from "@mui/material"

import { Orders } from "@/src/components/Orders"

export default function Page() {
  return (
    <Container>
      <Typography variant="h3" component="h1">
        Admin
      </Typography>

      <Orders />
    </Container>
  )
}
