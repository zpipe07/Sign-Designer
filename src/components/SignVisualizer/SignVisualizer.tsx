import { useEffect } from "react"
import { useWatch } from "react-hook-form"
import { Box, Skeleton } from "@mui/material"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export const SignVisualizer: React.FC = () => {
  const inputs = useWatch<DesignFormInputs>()

  const { width, height, maxLinesOfText } =
    SIZE_CONFIG_MAP[inputs.size!]

  const textLines = inputs?.textLines
    ?.slice(0, maxLinesOfText)
    .filter(({ value }) => {
      return !!value
    })

  const {
    data: svg,
    isFetching,
    refetch,
  } = useGetSignSvg(
    {
      ...inputs,
      textLines,
    } as DesignFormInputs,
    undefined,
    false,
  )

  useEffect(() => {
    refetch()
  }, [inputs])

  return (
    <Box position="relative">
      {isFetching ? (
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: 0,
            paddingTop: `${(height / width) * 100}%`,
          }}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: svg! }} />
      )}
    </Box>
  )
}
