import { Box, Typography, useTheme } from "@mui/material"

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

  const { width, height } = SIZE_CONFIG_MAP[size]

  const ratioOfMaxWidth = width / maxWidth

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
      sx={{
        position: "relative",

        "&:before, &:after": {
          content: '""',
          position: "absolute",
          backgroundColor: theme.palette.primary.main,
        },
        "&:before": {
          top: "100%",
          left: 4,
          right: 4,
          height: 2,
        },
        "&:after": {
          left: "100%",
          top: 4,
          bottom: 4,
          width: 2,
        },
      }}
    >
      <Box
        dangerouslySetInnerHTML={{ __html: svg }}
        sx={{
          fontSize: 0,
          borderRadius: 0.5,
          padding: 0.5,
          maxWidth: 150 * ratioOfMaxWidth,
          transition: "box-shadow 0.15s ease-in-out 0s",

          ...(checked && {
            boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
          }),
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        {width}&quot;
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          left: "100%",
          top: "50%",
          transform: "translate(5px, -50%)",
        }}
      >
        {height}&quot;
      </Typography>
    </Box>
  )
}
