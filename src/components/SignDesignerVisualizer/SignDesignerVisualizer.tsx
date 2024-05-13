"use client"

import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"
import opentype from "opentype.js"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizerView"

export const SignDesignerVisualizer: React.FC = () => {
  const [font, setFont] = useState<opentype.Font | null>(null)

  const inputs = useWatch() as DesignFormInputs

  useEffect(() => {
    opentype.load(
      "/fonts/AlbertSans-VariableFont_wght.ttf",
      (error, font) => {
        if (error) {
          console.error("font error", error)
          return
        }

        if (!font) {
          console.error("font not found")
          return
        }

        setFont(font)
      },
    )
  }, [inputs.fontFamily])

  if (!font) {
    return (
      <Box display="flex" justifyContent="center" marginTop={10}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          minHeight: 250,

          ...(inputs.orientation === "vertical" && {
            minHeight: 400,
          }),
        }}
      >
        <SignDesignerVisualizerView inputs={inputs} font={font} />
      </Box>
    </Box>
  )
}
