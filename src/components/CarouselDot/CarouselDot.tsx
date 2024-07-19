import { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import { Box, IconButton } from "@mui/material"

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi
      .on("reInit", onInit)
      .on("reInit", onSelect)
      .on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type Props = {
  isSelected: boolean
  onClick: () => void
}

export const CarouselDot: React.FC<Props> = ({
  isSelected,
  onClick,
}) => {
  return (
    <Box sx={{ padding: 0.5 }}>
      <IconButton
        size="small"
        onClick={onClick}
        sx={{
          border: "1px solid",

          ...(isSelected && {
            backgroundColor: "primary.main",

            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }),
        }}
      />
    </Box>
  )
}
