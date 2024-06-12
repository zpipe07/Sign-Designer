import { useWatch } from "react-hook-form"
import { Box, LinearProgress } from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export const SignVisualizer: React.FC = () => {
  const inputs = useWatch<DesignFormInputs>()

  const maxLinesOfText = SIZE_CONFIG_MAP[inputs.size!].maxLinesOfText

  const textLines = inputs?.textLines
    ?.slice(0, maxLinesOfText)
    .filter(({ value }) => {
      return !!value
    })
  const { data: svg, isFetching } = useGetSignSvg({
    ...inputs,
    textLines,
  } as DesignFormInputs)

  return (
    <Box position="relative">
      {isFetching && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
          }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Box>
  )
}
