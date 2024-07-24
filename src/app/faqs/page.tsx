import { Metadata } from "next"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { FAQsSection } from "@/src/components/FAQsSection"

export const metadata: Metadata = {
  title: "SignGenie - FAQs",
  description:
    "See our most frequently asked questions about our custom signs.",
}

export default function Page() {
  return (
    <Container sx={{ paddingBottom: 2 }} maxWidth="md">
      <Typography
        variant="h3"
        component="h1"
        marginTop={2}
        marginBottom={1}
      >
        FAQs
      </Typography>

      <FAQsSection />
    </Container>
  )
}
