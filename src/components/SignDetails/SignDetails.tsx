"use client"

import Image from "next/image"
import { Grid, Typography } from "@mui/material"

import { HeroContainer } from "@/src/components/HeroContainer"

export const SignDetails: React.FC = () => {
  return (
    <HeroContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" marginBottom={2}>
            Details
          </Typography>

          <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet Consectetur adipiscing
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Image
            src="/images/product/IMG_5837.jpg"
            alt=""
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
          />
        </Grid>
      </Grid>
    </HeroContainer>
  )
}
