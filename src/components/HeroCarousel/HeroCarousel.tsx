import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
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

export const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 400,

        [theme.breakpoints.up("sm")]: {
          minHeight: 500,
        },

        [theme.breakpoints.up("md")]: {
          minHeight: 600,
        },
      }}
    >
      <Box
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
        }}
      >
        <Card elevation={5}>
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
              onClick={() => onDotButtonClick(index)}
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
