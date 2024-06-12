import Link from "next/link"
import queryString from "query-string"
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"

export const FeaturedSignCard: React.FC<{
  title: string
  inputs: DesignFormInputs
}> = ({ title, inputs }) => {
  const { data: svg, isFetching } = useGetSignSvg(inputs)

  const textLines = JSON.stringify(
    Object.values(inputs.textLines).map((line) => line.value),
  )
  const qs = queryString.stringify({ ...inputs, textLines })
  const url = `/design?${qs}`

  return (
    <Card>
      {/* @ts-ignore */}
      <CardActionArea component={Link} href={url}>
        <CardMedia>
          <Box
            sx={{ padding: 2 }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </CardMedia>

        <CardContent>
          <Typography variant="h5">{title}</Typography>
        </CardContent>

        <CardActions></CardActions>
      </CardActionArea>
    </Card>
  )
}
