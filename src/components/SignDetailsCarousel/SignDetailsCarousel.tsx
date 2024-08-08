import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import useTheme from "@mui/material/styles/useTheme"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import {
  CarouselDot,
  useDotButton,
} from "@/src/components/CarouselDot"
import Image from "next/image"

const SLIDES = [
  {
    src: "/images/product/donnelly/1995_donnelly-ave-II.jpg",
    alt: "1995 Donnelly Ave II",
  },
  {
    src: "/images/product/top-round/300_alamo-plaza.jpg",
    alt: "300 Alamo Plaza",
  },
  {
    src: "/images/product/rectangle/516_west-l-street.jpg",
    alt: "516 West L Street",
  },
]

export const SignDetailsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

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
      sx={{ height: "100%", minHeight: 400, position: "relative" }}
    >
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

      <Box ref={emblaRef} sx={{ overflow: "hidden", height: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "100%",
            height: "100%",
          }}
        >
          {SLIDES.map((slide, index) => (
            <Box key={index} position="relative">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
