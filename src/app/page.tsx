import Link from "next/link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <>
      <Typography variant="h1">Sign Designer</Typography>

      <Typography marginBottom={2}>
        Design a design Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Vitae, distinctio!
      </Typography>

      <Box sx={{ justifyContent: "center" }}>
        <Button
          component={Link}
          href="/design"
          variant="contained"
          size="large"
          sx={{ marginBottom: 2, width: "100%" }}
        >
          Design your sign
        </Button>

        <Button
          component={Link}
          href="/log-in"
          variant="outlined"
          size="large"
          sx={{ width: "100%" }}
        >
          View our signs
        </Button>
      </Box>
    </>
  );
}
