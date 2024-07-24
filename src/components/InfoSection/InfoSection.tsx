"use client"

import { Typography, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

const CARDS = [
  {
    title: "Hierloom Pieces",
    description:
      "Each piece is lovingly handmade by the best possible artisans and checked and re-checked for durability.",
  },
  {
    title: "Ethical Materials",
    description:
      "All of our wools and cottons come from ethical sources. We guarantee the best in humanitarian apparel.",
  },
  {
    title: "Free Shipping",
    description:
      "Free shipping on all orders over $100. Pieces are shipped via next day delivery anywhere in the USA.",
  },
  {
    title: "Perfect Gifts",
    description:
      "Every piece of Falconette is beautifully wrapped. Each piece is a gift even if that gift is to yourself.",
  },
]

export const InfoSection: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      component="section"
      sx={{
        py: 4,
        backgroundColor: theme.palette.primary.light,
        [theme.breakpoints.up("md")]: {
          py: 8,
        },
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {CARDS.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <Typography variant="h5">{card.title}</Typography>
                <Typography>{card.description}</Typography>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
