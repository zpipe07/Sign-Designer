import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { FeaturedSignCard } from "@/src/components/FeaturedSigns/FeaturedSignCard"
import Link from "next/link"

export const FEATURED_SIGNS: {
  title: string
  inputs: DesignFormInputs
}[] = [
  {
    title: "",
    inputs: {
      shape: "ellipse",
      size: "large",
      color: "white::black",
      fontFamily: "Forque",
      mountingStyle: "hanging",
      edgeStyle: "square",
      borderWidth: "0.2",
      textLines: [
        { value: "Text", fontSize: "3.2", offset: "0" },
        { value: "Your custom", fontSize: "2.4", offset: "-0.5" },
        { value: "Goes here", fontSize: "2.4", offset: "0.25" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "top round",
      size: "large",
      color: "saddlebrown::white",
      fontFamily: "DMSerif",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.1",
      textLines: [
        { value: "Text", fontSize: "3.6", offset: "-0.5" },
        { value: "Your custom", fontSize: "1.8", offset: "-0.5" },
        { value: "Goes here", fontSize: "2.4", offset: "-0.25" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "bread",
      size: "large",
      color: "darkblue::white",
      fontFamily: "Airstream",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0",
      textLines: [
        { value: "Text", fontSize: "4.6", offset: "0.5" },
        { value: "Your custom", fontSize: "2.4", offset: "0" },
        { value: "Goes here", fontSize: "3", offset: "-0.25" },
      ],
    },
  },
  // {
  //   title: "The Standard",
  //   inputs: {
  //     shape: "rectangle",
  //     size: "large",
  //     color: "black::white",
  //     fontFamily: "Shrikhand",
  //     mountingStyle: "hanging",
  //     edgeStyle: "square",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "1234", fontSize: "3", offset: "0" },
  //       { value: "Main St", fontSize: "2", offset: "0" },
  //       { value: "Anytown, USA", fontSize: "1.5", offset: "0" },
  //     ],
  //   },
  // },
  // {
  //   title: "The Clubhouse",
  //   inputs: {
  //     shape: "ellipse",
  //     size: "large",
  //     color: "green::tan",
  //     fontFamily: "Rye",
  //     mountingStyle: "hanging",
  //     edgeStyle: "square",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "Par 4", fontSize: "3", offset: "0" },
  //       { value: "Hole 9", fontSize: "2.5", offset: "0" },
  //       // { value: "", fontSize: 2 },
  //     ],
  //   },
  // },
  // {
  //   title: "The Marley",
  //   inputs: {
  //     shape: "bread",
  //     size: "large",
  //     color: "black::yellow",
  //     fontFamily: "Arbutus",
  //     mountingStyle: "hanging",
  //     edgeStyle: "square",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "420", fontSize: "4", offset: "0" },
  //       { value: "High Street", fontSize: "1.8", offset: "0" },
  //       { value: "The Marley's", fontSize: "1.8", offset: "0" },
  //     ],
  //   },
  // },
]

export const FeaturedSigns: React.FC = () => {
  return (
    <Box component="section" py={4}>
      <Container>
        <Typography variant="h3" textAlign="center" marginBottom={2}>
          Featured Signs
        </Typography>

        <Grid container spacing={2}>
          {FEATURED_SIGNS.map(({ title, inputs }) => {
            return (
              <Grid item xs={12} sm={4} md={4} key={title}>
                <FeaturedSignCard title={title} inputs={inputs} />
              </Grid>
            )
          })}
        </Grid>

        <Box textAlign="center" marginTop={2}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            component={Link}
            href="/shop"
          >
            View all signs
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
