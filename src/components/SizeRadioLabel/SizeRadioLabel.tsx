import { Box, useTheme } from "@mui/material"

import { Size } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { useWatch } from "react-hook-form"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

type Props = {
  size: Size
  checked: boolean
}

const maxWidth = 23

export const SizeRadioLabel: React.FC<Props> = ({
  size,
  checked,
}) => {
  const theme = useTheme()

  const selectedShape = useWatch({ name: "shape" })

  const { width } = SIZE_CONFIG_MAP[size]
  // console.log({ width, height })

  const ratioOfMaxWidth = width / maxWidth
  console.log({ ratioOfMaxWidth })

  const { data: svg } = useGetSignSvg({
    shape: selectedShape,
    size,
    // @ts-ignore
    color: "#D6DAD2/#D6DAD2",
    textLines: [],
    fontFamily: "Albert",
    mountingStyle: "hanging",
  })

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: svg }}
      sx={{
        fontSize: 0,
        borderRadius: 0.5,
        padding: 0.5,
        maxWidth: 125 * ratioOfMaxWidth,
        transition: "box-shadow 0.15s ease-in-out 0s",

        ...(checked && {
          boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
        }),
      }}
    />
  )
}
