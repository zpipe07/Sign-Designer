"use client"

import Image from "next/image"
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"

const CARDS = [
  {
    title: "Custom signs",
    desciption:
      "Create a fully custom sign for your home or business.",
    image: "IMG_6032.jpg",
  },
  {
    title: "Made in the USA",
    desciption:
      "Materials and manufacturing are sourced right here in the USA.",
    image: "IMG_6018.jpg",
  },
  {
    title: "Built to last",
    desciption: "Our signs are built to withstand the elements.",
    image: "IMG_5959.jpg",
  },
]

export const OurSignsSection: React.FC = () => {
  const theme = useTheme()

  return (
    <Box component="section" sx={{ py: 2 }}>
      <Container>
        <Typography variant="h3" textAlign="center" marginBottom={2}>
          Our signs
        </Typography>

        <Grid container spacing={2}>
          {CARDS.map((card) => {
            return (
              <Grid item xs={12} md={4} key={card.title}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      textAlign: "center",
                      height: "100%",

                      [theme.breakpoints.up("sm")]: {
                        display: "flex",
                        alignItems: "center",
                      },

                      [theme.breakpoints.up("md")]: {
                        flexDirection: "column",
                      },
                    }}
                  >
                    <Box marginBottom={2} flexGrow={1}>
                      <Typography variant="h4">
                        {card.title}
                      </Typography>
                      <Typography>{card.desciption}</Typography>
                    </Box>

                    <Image
                      src={`/images/product/${card.image}`}
                      alt=""
                      width={150}
                      height={150}
                      style={{
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
