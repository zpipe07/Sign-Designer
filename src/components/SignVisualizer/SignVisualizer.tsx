import { useWatch } from "react-hook-form"
import { Box, LinearProgress } from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"

export const SignVisualizer: React.FC = () => {
  const inputs = useWatch<DesignFormInputs>()

  const { data: svg, isFetching } = useGetSignSvg(
    inputs as DesignFormInputs,
  )

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
