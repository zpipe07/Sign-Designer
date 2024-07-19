import Image from "next/image"
import { Container, Grid, Typography } from "@mui/material"

const IMAGES = [
  "IMG_6032.jpg",
  "IMG_6018.jpg",
  "IMG_5929.jpg",
  "IMG_5954.jpg",
  "IMG_5959.jpg",
  "IMG_6007.jpg",
  "IMG_5837.jpg",
  "IMG_5834.jpg",
  // "IMG_5822.jpg",
]

export default function Page() {
  return (
    <Container>
      <Typography
        variant="h3"
        component="h1"
        marginTop={2}
        marginBottom={1}
      >
        Our work
      </Typography>
      <Typography marginBottom={2}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Molestiae nostrum dolorum officiis eum voluptates, vitae id ut
        assumenda minus velit.
      </Typography>

      <Grid container spacing={3}>
        {IMAGES.map((image) => {
          return (
            <Grid item xs={6} key={image}>
              <Image
                src={`/images/product/${image}`}
                alt=""
                width={300}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
