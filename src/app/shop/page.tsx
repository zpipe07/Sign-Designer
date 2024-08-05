import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { ShopSigns } from "@/src/components/ShopSigns"

export default function Page() {
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h3" component="h1" marginBottom={1}>
        Shop
      </Typography>

      <Typography marginBottom={2}>
        Select a sign to get started. You can customize the text,
        color, font, and more.
      </Typography>

      <ShopSigns />
    </Container>
  )
}
