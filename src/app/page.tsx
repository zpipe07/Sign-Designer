"use client"

// import Link from "next/link"
import Image from "next/image"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

import { TextInputForm } from "@/src/components/TextInputForm"
import { HeroContainer } from "@/src/components/HeroContainer"

export default function Home() {
  return (
    <HeroContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" component="h1" marginBottom={2}>
            REFRESH YOUR HOME TODAY
          </Typography>

          <Typography marginBottom={2}>
            The curb appeal you’ve been waiting for with our fully
            custom home signs.
          </Typography>

          <TextInputForm />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Image
            src="/images/sign-example.svg"
            alt=""
            width={631}
            height={289}
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </Grid>
    </HeroContainer>
  )
}
