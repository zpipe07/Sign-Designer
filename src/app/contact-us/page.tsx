import { Container, Typography } from "@mui/material"

import { ContactUsForm } from "@/src/components/ContactUsForm"

export default function Page() {
  return (
    <Container>
      <Typography
        variant="h3"
        component="h1"
        marginTop={2}
        marginBottom={1}
      >
        Contact us
      </Typography>
      <Typography>
        Send us a message, ask us a question, or just say hello!
      </Typography>

      <ContactUsForm />
    </Container>
  )
}
