import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box component="main">
      <Typography variant="h1">Hello, world!</Typography>

      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, sed
        perferendis odit pariatur voluptate quos eum perspiciatis quod
        reprehenderit numquam.
      </Typography>

      <Link href="/log-in">Log in</Link>
      <Link href="/sign-up">Sign up</Link>
    </Box>
  );
}
