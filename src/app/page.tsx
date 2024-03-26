"use client";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <>
      <Typography variant="h3" component="h1" marginBottom={2}>
        Sign Designer
      </Typography>

      <Typography marginBottom={2}>
        Design a design Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Vitae, distinctio!
      </Typography>

      <Grid container spacing={2}>
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
      </Grid>
    </>
  );
}
