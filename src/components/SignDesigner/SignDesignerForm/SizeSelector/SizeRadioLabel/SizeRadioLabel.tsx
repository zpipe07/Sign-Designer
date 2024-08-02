import { Box, Skeleton, Typography, useTheme } from "@mui/material"

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

  const { data: svg, isLoading } = useGetSignSvg(
    {
      shape: selectedShape,
      size,
      color: "#D6DAD2::#D6DAD2",
      textLines: [],
      fontFamily: "Arbutus",
      mountingStyle: "hanging",
      edgeStyle: "square",
      borderWidth: "0",
    },
    "size",
    true,
    false,
  )

  if (isLoading) {
    const ratio = height / width

    return (
      <Skeleton
        variant="rectangular"
        width={100}
        height={100 * ratio}
        sx={{ maxHeight: 150 }}
      />
    )
  }

  return (
    <Box
      sx={{
        position: "relative",

        "&:before, &:after": {
          content: '""',
          position: "absolute",
          backgroundColor: theme.palette.primary.main,
          zIndex: -1,
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
        dangerouslySetInnerHTML={{ __html: svg! }}
        sx={{
          fontSize: 0,
          borderRadius: 0.5,
          padding: 0.5,
          maxWidth: 250 * ratioOfMaxWidth,
          // maxHeight: 150,
          transition: "box-shadow 0.15s ease-in-out 0s",

          svg: {
            maxHeight: "100%",
          },

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
