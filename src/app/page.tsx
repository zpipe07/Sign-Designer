"use client"

import Link from "next/link"
import { useTheme } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Image from "next/image"
import Box from "@mui/material/Box"

import { TextInputForm } from "@/src/components/TextInputForm"

export default function Home() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: theme.palette.primary.light,
        paddingTop: 4,
        paddingBottom: 4,

        "&:before, &:after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "calc(100vw - 100%)",
          backgroundColor: theme.palette.primary.light,
        },

        "&:before": {
          right: "100%",
        },

        "&:after": {
          left: "100%",
        },
      }}
    >
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
    </Box>
  )
}
