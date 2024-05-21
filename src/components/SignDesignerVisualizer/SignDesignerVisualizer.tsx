"use client"

import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"
import opentype from "opentype.js"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

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

  useEffect(() => {
    const fontUrl = FONT_MAP[inputs.fontFamily as FontFamily]

    if (!fontUrl) {
      return
    }

    opentype.load(fontUrl, (error, font) => {
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
      <Box display="flex" justifyContent="center" marginTop={10}>
        <CircularProgress />
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
          // maxWidth: 400,
          // minHeight: 250,
          maxHeight: 550,

          ...(inputs.orientation === "vertical" &&
            {
              // minHeight: 400,
            }),
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
