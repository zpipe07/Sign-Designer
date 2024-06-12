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
      textLines: [
        { value: "1234" },
        { value: "Main St" },
        { value: "Anytown, USA" },
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
      textLines: [
        { value: "Par 4" },
        { value: "Hole 9" },
        { value: "" },
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
      textLines: [
        { value: "420" },
        { value: "High Street" },
        { value: "The Marley's" },
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
