"use client"

import Link from "next/link"
import Image from "next/image"
import queryString from "query-string"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material"

import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { FeaturedSign } from "@/src/components/FeaturedSigns"

export const FeaturedSignCard: React.FC<FeaturedSign> = ({
  title,
  inputs,
  imageUrl,
}) => {
  const {
    data: svg,
    isLoading,
    isFetching,
  } = useGetSignSvg(inputs, "featured", true, true, true)

  const textLines = JSON.stringify(inputs.textLines)
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
              sx={{
                position: "relative",

                "&:hover": {
                  img: {
                    visibility: "visible !important",
                    opacity: "1 !important",
                    transform: "scale(1.05) !important",
                  },
                },
              }}
            >
              <Box
                dangerouslySetInnerHTML={{ __html: svg! }}
                sx={{ svg: { maxHeight: 200 } }}
              />

              {imageUrl && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    style={{
                      width: "100%",
                      height: "100%",
                      visibility: "hidden",
                      opacity: 0,
                      transform: "scale(1)",
                      transition: "all 0.2s ease-in-out",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}

          <Box height={4}>
            {isFetching && !isLoading && <LinearProgress />}
          </Box>

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
