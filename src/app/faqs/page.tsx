import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { FAQsSection } from "@/src/components/FAQsSection"

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
