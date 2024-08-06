import { Metadata } from "next"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { SignsShop } from "@/src/components/SignsShop"

export const metadata: Metadata = {
  title: "SignGenie - Shop",
  description:
    "Shop our custom signs for homes and businesses. Select a sign to get started.",
}

export default function Page() {
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h3" component="h1" marginBottom={1}>
        Shop our signs
      </Typography>

      <Typography marginBottom={2}>
        Below are some of our most popular signs. Click on a sign to
        see all of the customization options.
      </Typography>

      <SignsShop />
    </Container>
  )
}
