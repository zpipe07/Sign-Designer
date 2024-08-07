import { useEffect, useMemo, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useWatch } from "react-hook-form"
import {
  Alert,
  Box,
  LinearProgress,
  Skeleton,
  debounce,
  useTheme,
} from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { ProductVariantImage } from "@/src/components/ProductVariantImage"

export const SignVisualizer: React.FC = () => {
  const theme = useTheme()

  const inputs = useWatch<DesignFormInputs>()

  const ref = useRef<HTMLDivElement>(null)

  const [doesTextFit, setDoesTextFit] = useState<boolean>(true)

  const { width, height, maxLinesOfText } = inputs.size
    ? SIZE_CONFIG_MAP[inputs.size]
    : { width: 0, height: 0, maxLinesOfText: 0 }

  const isVertical = inputs.size?.includes("vertical")

  const textLines = inputs.textLines?.slice(0, maxLinesOfText)
  // .filter(({ value }) => {
  //   return !!value
  // })

  const queryClient = useQueryClient()

  const {
    data: svg,
    isFetching,
    isLoading,
    refetch,
  } = useGetSignSvg(
    {
      ...inputs,
      textLines,
    } as DesignFormInputs,
    undefined,
    false,
    true,
    true,
  )

  useEffect(() => {
    const textLines = inputs.textLines?.slice(0, maxLinesOfText)
    const data = queryClient.getQueryData([
      "/api/v1/svg",
      {
        ...inputs,
        textLines,
      } as DesignFormInputs,
      true,
      true,
    ])

    if (data) {
      queryClient.setQueryData(
        ["/api/v1/svg", inputs, true, true],
        data,
      )

      return
    }

    fetchData()
  }, [inputs])

  useEffect(() => {
    if (isFetching || !svg || !ref.current) {
      return
    }

    const svgElement = ref.current.querySelector("svg")
    const doesTextFit =
      svgElement?.getAttribute("data-does-text-fit") === "true"

    setDoesTextFit(doesTextFit)
  }, [isFetching, svg])

  const fetchData = useMemo(() => {
    return debounce(() => {
      return refetch()
    }, 500)
  }, [refetch])

  return (
    <Box position="relative">
      {isLoading || !svg ? (
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: 0,
            paddingTop: `${(height / width) * 100}%`,

            ...(isVertical && {
              paddingTop: 0,
              height: 300,
              width: 70,
              margin: "0 auto",

              [theme.breakpoints.up("sm")]: {
                width: 93.33,
                height: 400,
              },

              [theme.breakpoints.up("md")]: {
                width: 116.66,
                height: 500,
              },
            }),
          }}
        />
      ) : (
        <>
          <Box
            dangerouslySetInnerHTML={{ __html: svg }}
            sx={{
              fontSize: 0,

              svg: {
                maxHeight: 300,

                [theme.breakpoints.up("sm")]: {
                  maxHeight: 400,
                },

                [theme.breakpoints.up("md")]: {
                  maxHeight: 500,
                },
              },
            }}
            ref={ref}
          />

          <Box height={4} marginTop={1}>
            {isFetching && <LinearProgress />}
          </Box>

          {!doesTextFit && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              The text does not fit. Please shorten the text or reduce
              the font size.
            </Alert>
          )}
        </>
      )}
    </Box>
  )
}
