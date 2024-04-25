"use client"
import { useWatch } from "react-hook-form"
import Box from "@mui/material/Box"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer/SignDesignerVisualizerView"

export const SignDesignerVisualizer: React.FC = () => {
  const inputs = useWatch() as DesignFormInputs

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,

          ...(inputs.orientation === "vertical" && {
            minHeight: 400,
          }),
        }}
      >
        <SignDesignerVisualizerView inputs={inputs} />
      </Box>
    </Box>
  )
}
