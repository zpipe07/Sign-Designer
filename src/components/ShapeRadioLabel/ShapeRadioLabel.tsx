import { Shape } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"
import { Box, useTheme } from "@mui/material"

type Props = {
  shape: Shape
  checked: boolean
}

export const ShapeRadioLabel: React.FC<Props> = ({
  shape,
  checked,
}) => {
  const theme = useTheme()

  const { data: svg } = useGetSignSvg({
    shape,
    size: "large",
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
        transition: "box-shadow 0.15s ease-in-out 0s",

        ...(checked && {
          boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
        }),
      }}
    />
  )
}
