import { Container, Grid, Typography } from "@mui/material"
import Image from "next/image"

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
      <Typography variant="h3" component="h1" marginTop={2}>
        Our work
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

      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Numquam delectus aliquam hic veniam nisi sed, natus explicabo
        voluptates ducimus? Amet, quia qui in delectus sequi corrupti
        consectetur iusto non beatae! Voluptatem odit, eius debitis
        ducimus quis velit repellat dicta exercitationem odio. Error
        sequi reiciendis explicabo natus nihil soluta accusantium.
        Sapiente quia rem fuga labore illum dignissimos corrupti,
        dolore fugit maiores error. Odit, blanditiis? Dolorum
        perspiciatis illo, facere repudiandae recusandae obcaecati
        natus ab deserunt dolorem quo officia? Iusto quisquam mollitia
        voluptatibus hic eum a, ducimus perferendis eos autem
        quibusdam doloribus maxime deleniti totam nulla aliquam eius
        quae necessitatibus quo minima unde.
      </Typography>
    </Container>
  )
}
