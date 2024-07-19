import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { Box, Button, IconButton, useTheme } from "@mui/material"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined"
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined"

export const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const theme = useTheme()

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 310,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          href="/design"
          component={Link}
        >
          Design your sign now
        </Button>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          width: "100%",
          zIndex: 99,
          display: "flex",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <IconButton onClick={scrollPrev} color="info">
          <ArrowCircleLeftOutlinedIcon fontSize="large" />
        </IconButton>

        <IconButton onClick={scrollNext} color="info">
          <ArrowCircleRightOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        ref={emblaRef}
        sx={{
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "80%",
            height: 300,

            [theme.breakpoints.up("sm")]: {
              height: 400,
            },

            [theme.breakpoints.up("md")]: {
              height: 500,
            },

            [theme.breakpoints.up("md")]: {
              height: 600,
            },
          }}
        >
          <Image
            src="/images/product/IMG_5834.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "100%",
            }}
          />

          <Image
            src="/images/product/IMG_5822.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "100%",
            }}
          />

          <Image
            src="/images/product/IMG_5837.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
