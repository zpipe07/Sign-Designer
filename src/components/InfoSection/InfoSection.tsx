"use client"

import { Typography, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import CarpenterIcon from "@mui/icons-material/Carpenter"
import BuildIcon from "@mui/icons-material/Build"
import FlagIcon from "@mui/icons-material/Flag"

const CARDS = [
  {
    title: "Lifetime warranty",
    description:
      "Our signs are made from the highest quality materials. They are built to last a lifetime.",
    icon: BuildIcon,
  },
  {
    title: "Made in the USA",
    description: "Each sign is proudly made in the USA.",
    icon: FlagIcon,
  },
  {
    title: "Made to order",
    description:
      "Each sign is cut to the exact specifications of your order. We guarantee the perfect fit.",
    icon: CarpenterIcon,
  },
  // {
  //   title: "Perfect Gifts",
  //   description:
  //     "Every piece of Falconette is beautifully wrapped. Each piece is a gift even if that gift is to yourself.",
  // },
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
        <Grid container spacing={6}>
          {CARDS.map(({ title, description, icon: Icon }) => {
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={title}
                sx={{ textAlign: "center" }}
              >
                <Icon sx={{ fontSize: 24 }} />
                <Typography variant="h5" marginBottom={1}>
                  {title}
                </Typography>
                <Typography>{description}</Typography>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
