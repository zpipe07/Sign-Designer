import { Metadata } from "next"
import Typography from "@mui/material/Typography"
import { Container } from "@mui/material"

import { Cart } from "@/src/components/Cart"

export const metadata: Metadata = {
  title: "SignGenie - View your cart",
  description:
    "Review the items in your cart and proceed to checkout.",
}

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
