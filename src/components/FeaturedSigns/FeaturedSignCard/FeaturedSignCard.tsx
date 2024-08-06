"use client"

import Link from "next/link"
import queryString from "query-string"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"

export const FeaturedSignCard: React.FC<{
  title: string
  inputs: DesignFormInputs
}> = ({ title, inputs }) => {
  const { data: svg, isLoading } = useGetSignSvg(
    inputs,
    "featured",
    true,
    true,
  )

  const textLines = JSON.stringify(
    // Object.values(inputs.textLines).map((line) => line.value),
    inputs.textLines,
  )
  const qs = queryString.stringify({ ...inputs, textLines })

  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        href={{
          pathname: "/design",
          search: qs,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{
                height: 0,
                paddingTop: "78.5%",
              }}
            />
          ) : (
            <Box
              dangerouslySetInnerHTML={{ __html: svg! }}
              sx={{ svg: { maxHeight: 250 } }}
            />
          )}

          <Typography variant="h4" marginBottom={1}>
            {title}
          </Typography>

          <Button type="button" variant="outlined">
            Customize this sign
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
