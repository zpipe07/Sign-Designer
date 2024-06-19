import { Box, Grid, Typography } from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { FeaturedSignCard } from "@/src/components/FeaturedSigns/FeaturedSignCard"

const FEATURED_SIGNS: {
  title: string
  inputs: DesignFormInputs
}[] = [
  {
    title: "The Standard",
    inputs: {
      shape: "rectangle",
      size: "large",
      color: "black/white",
      fontFamily: "Albert",
      mountingStyle: "hanging",
      edgeStyle: "square",
      textLines: [
        { value: "1234", fontSize: 3 },
        { value: "Main St", fontSize: 2 },
        { value: "Anytown, USA", fontSize: 1.5 },
      ],
    },
  },
  {
    title: "The Clubhouse",
    inputs: {
      shape: "ellipse",
      size: "large",
      color: "green/tan",
      fontFamily: "Expletus",
      mountingStyle: "hanging",
      edgeStyle: "square",
      textLines: [
        { value: "Par 4", fontSize: 3 },
        { value: "Hole 9", fontSize: 2.5 },
        // { value: "", fontSize: 2 },
      ],
    },
  },
  {
    title: "The Marley",
    inputs: {
      shape: "bread",
      size: "large",
      color: "black/yellow",
      fontFamily: "Arbutus",
      mountingStyle: "hanging",
      edgeStyle: "square",
      textLines: [
        { value: "420", fontSize: 4 },
        { value: "High Street", fontSize: 1.8 },
        { value: "The Marley's", fontSize: 1.8 },
      ],
    },
  },
]

export const FeaturedSigns: React.FC = () => {
  return (
    <Box component="section" paddingTop={2} paddingBottom={2}>
      <Typography variant="h4" marginBottom={1}>
        Featured Signs
      </Typography>

      <Grid container spacing={2}>
        {FEATURED_SIGNS.map(({ title, inputs }) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <FeaturedSignCard title={title} inputs={inputs} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
