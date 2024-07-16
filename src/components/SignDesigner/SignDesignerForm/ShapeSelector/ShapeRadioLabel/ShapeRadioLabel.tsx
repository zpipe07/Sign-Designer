import { Box, Skeleton, useTheme } from "@mui/material"

import { Shape } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

type Props = {
  shape: Shape
  checked: boolean
}

export const ShapeRadioLabel: React.FC<Props> = ({
  shape,
  checked,
}) => {
  const theme = useTheme()

  const size = "large"

  const { data: svg, isLoading } = useGetSignSvg(
    {
      shape,
      size,
      color: "#D6DAD2::#D6DAD2",
      textLines: [],
      fontFamily: "Arbutus",
      mountingStyle: "hanging",
      edgeStyle: "square",
      borderWidth: "0",
    },
    "shape",
  )

  if (isLoading) {
    const { height, width } = SIZE_CONFIG_MAP[size]
    const ratio = height / width

    return (
      <Skeleton
        variant="rectangular"
        width={100}
        height={100 * ratio}
      />
    )
  }

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: svg! }}
      sx={{
        fontSize: 0,
        borderRadius: 0.5,
        padding: 0.5,
        transition: "box-shadow 0.15s ease-in-out 0s",

        ...(checked && {
          boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
        }),
      }}
    />
  )
}
