"use client"

import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"
import { useTheme } from "@mui/material"
import opentype from "opentype.js"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

import {
  DesignFormInputs,
  FontFamily,
} from "@/src/components/SignDesigner/types"
import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizerView"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { FONT_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export const SignDesignerVisualizer: React.FC = () => {
  const [font, setFont] = useState<opentype.Font | null>(null)

  const inputs = useWatch() as DesignFormInputs

  const { data, isLoading } = useGetProduct(112)

  const theme = useTheme()

  useEffect(() => {
    const fontFile = FONT_MAP[inputs.fontFamily as FontFamily]

    if (!fontFile) {
      return
    }

    opentype.load(`/fonts/${fontFile}`, (error, font) => {
      if (error) {
        console.error("font error", error)
        return
      }

      if (!font) {
        console.error("font not found")
        return
      }

      setFont(font)
    })
  }, [inputs.fontFamily])

  if (!font || isLoading) {
    return (
      <Box>
        <Skeleton
          variant="rounded"
          sx={{
            height: 340,
            borderRadius: 5,

            [theme.breakpoints.up("sm")]: {
              height: 550,
            },
            [theme.breakpoints.up("md")]: {
              height: 400,
            },
            [theme.breakpoints.up("lg")]: {
              height: 540,
            },
          }}
        />
      </Box>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: "100%",
          maxHeight: 550,
        }}
      >
        <SignDesignerVisualizerView
          inputs={inputs}
          font={font}
          productOptionsMap={data?.productOptionsMap}
        />
      </Box>
    </Box>
  )
}
