import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Box } from "@mui/material"

import {
  CarouselDot,
  useDotButton,
} from "@/src/components/CarouselDot"
import { ProductVariantImage } from "@/src/components/ProductVariantImage"
import { SignVisualizer } from "@/src/components/SignVisualizer/SignVisualizer"

export const SignVisualizerCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <Box ref={emblaRef} sx={{ overflowX: "hidden" }}>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <SignVisualizer />
        </Box>

        <ProductVariantImage />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {scrollSnaps.map((_, index) => {
          return (
            <CarouselDot
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={index === selectedIndex}
            />
          )
        })}
      </Box>
    </Box>
  )
}
