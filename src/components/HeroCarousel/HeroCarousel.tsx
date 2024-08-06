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
        [theme.breakpoints.up("md")]: {
          height: 600,
          display: "grid",
          gridTemplateColumns: "auto 375px",
        },

        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns: "auto 500px",
        },

        [theme.breakpoints.up("xl")]: {
          gridTemplateColumns: "1fr 1fr",
        },
      }}
    >
      {/* hero text */}
      <Box
        sx={{
          position: "relative",
          height: 300,

          [theme.breakpoints.up("md")]: {
            height: "100%",
          },
        }}
      >
        {/* carousel navigation */}
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

        {/* carousel */}
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

      {/* hero text */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          py: 4,
          px: 1,

          [theme.breakpoints.up("md")]: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.primary.contrastText,
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Custom signs to match your style
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/shop"
              component={Link}
              sx={{
                margin: 1,
              }}
            >
              Shop our signs
            </Button>

            <Button
              variant="outlined"
              size="large"
              color="info"
              href="/our-work"
              component={Link}
              sx={{
                margin: 1,
              }}
            >
              View sign gallery
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
