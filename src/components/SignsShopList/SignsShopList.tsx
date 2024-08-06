import Grid from "@mui/material/Grid"

import { FeaturedSignCard } from "@/src/components/FeaturedSigns/FeaturedSignCard"

type Props = {
  signs: {
    title: string
    inputs: any
  }[]
}

export const SignsShopList: React.FC<Props> = ({ signs }) => {
  return (
    <Grid container spacing={2}>
      {signs.map(({ title, inputs }) => {
        return (
          <Grid item xs={12} sm={4} md={3} key={title}>
            <FeaturedSignCard title={title} inputs={inputs} />
          </Grid>
        )
      })}
    </Grid>
  )
}
