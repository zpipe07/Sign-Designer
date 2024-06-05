"use client"

import Link from "next/link"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

import { TextInputForm } from "@/src/components/TextInputForm"
import Image from "next/image"

export default function Home() {
  return (
    <>
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
            // maxWidth="100%"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            component={Link}
            href="/design"
            variant="contained"
            size="large"
            fullWidth
          >
            Design your sign
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            component={Link}
            href="/our-work"
            variant="outlined"
            size="large"
            fullWidth
          >
            View our work
          </Button>
        </Grid>
      </Grid> */}
    </>
  )
}
