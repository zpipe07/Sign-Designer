import Typography from "@mui/material/Typography"
import { Container } from "@mui/material"

import { Cart } from "@/src/components/Cart"

export default function Page() {
  return (
    <Container>
      <Typography variant="h3" component="h1" marginTop={2}>
        Your cart
      </Typography>

      <Cart />
    </Container>
  )
}
