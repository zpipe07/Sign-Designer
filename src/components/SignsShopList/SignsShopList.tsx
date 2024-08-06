import Grid from "@mui/material/Grid"

import { FeaturedSignCard } from "@/src/components/FeaturedSigns/FeaturedSignCard"
import { FeaturedSign } from "@/src/components/FeaturedSigns"

type Props = {
  signs: FeaturedSign[]
}

export const SignsShopList: React.FC<Props> = ({ signs }) => {
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      {signs.map(({ title, inputs, imageUrl }) => {
        return (
          <Grid item xs={6} sm={4} key={title}>
            <FeaturedSignCard
              title={title}
              inputs={inputs}
              imageUrl={imageUrl}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
