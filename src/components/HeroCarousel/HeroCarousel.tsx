"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import {
  CarouselDot,
  useDotButton,
} from "@/src/components/CarouselDot"

import OneImg from "../../../public/images/product/IMG_5834.jpg"
import TwoImg from "../../../public/images/product/IMG_5822.jpg"
import ThreeImg from "../../../public/images/product/IMG_5837.jpg"

export const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      emblaApi.plugins().autoplay.reset()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      emblaApi.plugins().autoplay.reset()
    }
  }, [emblaApi])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        height: 600,
      }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          zIndex: 99,
          padding: 2,

          [theme.breakpoints.up("sm")]: {
            paddingRight: 0,
            width: 400,
            top: "50%",
            transform: "translateY(-50%)",
          },

          [theme.breakpoints.up("lg")]: {
            right: "25%",
          },
        }}
      >
        <Card
          elevation={5}
          sx={{
            [theme.breakpoints.up("sm")]: {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },

            [theme.breakpoints.up("lg")]: {
              borderRadius: 1,
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                marginBottom: 1,
              }}
            >
              Refresh your home today
            </Typography>
            <Typography marginBottom={2}>
              Create a custom made-to-order sign that will give your
              home a personal touch.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              href="/design"
              component={Link}
              sx={{
                marginBottom: 2,
              }}
            >
              Design your sign
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              href="/design"
              component={Link}
            >
              View our signs
            </Button>
          </CardContent>
        </Card>
      </Box> */}

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          transform: "translateY(-50%)",
          zIndex: 9,
          padding: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.primary.contrastText,
            textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Refresh your home today
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/design"
            component={Link}
            sx={{
              marginBottom: 2,
            }}
          >
            Design your sign
          </Button>

          <Button
            variant="outlined"
            size="large"
            color="info"
            href="/design"
            component={Link}
          >
            View our signs
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={scrollPrev}
          sx={{ color: theme.palette.common.black }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {scrollSnaps.map((_, index) => {
          return (
            <CarouselDot
              key={index}
              onClick={() => {
                onDotButtonClick(index)
                emblaApi?.plugins().autoplay.reset()
              }}
              isSelected={index === selectedIndex}
            />
          )
        })}

        <IconButton
          onClick={scrollNext}
          sx={{ color: theme.palette.common.black }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        ref={emblaRef}
        sx={{
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "100%",
            height: "100%",
          }}
        >
          <Box position="relative">
            <Image
              src={OneImg}
              alt=""
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>

          <Box position="relative">
            <Image
              src={TwoImg}
              alt=""
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>

          <Box position="relative">
            <Image
              src={ThreeImg}
              alt=""
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
