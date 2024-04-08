import { useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { DesignFormInputs } from "@/src/components/SignDesigner/SignDesignerForm"
import { Rectangle } from "@/src/components/SVG/Rectangle"
import { Ellipse } from "@/src/components/SVG/Ellipse"
import { TopRoundBorder } from "@/src/components/SVG/TopRoundBorder"
import { SideRound } from "@/src/components/SVG/SideRound"

const dimensionsMap = {
  small: { height: 15, width: 25 },
  medium: { height: 20, width: 30 },
  large: { height: 25, width: 35 },
}

export const SignDesignerVisualizer: React.FC = () => {
  const inputs = useWatch() as DesignFormInputs
  console.log({ inputs })

  const width = 400
  const height = 250
  const borderWidth = 20

  return (
    <Box display="flex" justifyContent="center">
      <Box position="relative">
        {inputs.shape === "rectangle" && (
          <Rectangle
            width={width}
            height={height}
            borderWidth={borderWidth}
            inputs={inputs}
          />
        )}

        {inputs.shape === "ellipse" && (
          <Ellipse
            width={width}
            height={height + 40}
            borderWidth={borderWidth}
            inputs={inputs}
          />
        )}

        {inputs.shape === "topRound" && (
          <TopRoundBorder
            width={width}
            height={height}
            borderWidth={borderWidth}
            inputs={inputs}
          />
        )}

        {inputs.shape === "sideRound" && (
          <SideRound
            width={width}
            height={height}
            borderWidth={borderWidth}
            inputs={inputs}
          />
        )}
        {/* <svg height="400" width="400">
        {inputs.shape === "rectangle" && (
          <g transform={`translate(${borderWidth},${borderWidth})`}>
            <rect
              width={width - borderWidth * 2}
              height={height - borderWidth * 2}
              fill={inputs.color.backgroundColor}
              stroke={inputs.color.foregroundColor}
              strokeWidth={borderWidth}
            />

            <text
              y={75}
              x={(width - borderWidth * 2) / 2}
              fontSize={50}
              fontWeight={800}
              alignmentBaseline="middle"
              textAnchor="middle"
              fill={inputs.color.foregroundColor}
              fontFamily={inputs.fontFamily}
            >
              {inputs.streetNumber}
            </text>
            <text
              y={125}
              x={(width - borderWidth * 2) / 2}
              fontSize={40}
              fontWeight={600}
              alignmentBaseline="middle"
              textAnchor="middle"
              fill={inputs.color.foregroundColor}
              fontFamily={inputs.fontFamily}
            >
              {inputs.streetName}
            </text>
          </g>
        )}

        {inputs.shape === "ellipse" && (
          <g transform="translate(200,200)">
            <circle
              r="200"
              cx="0"
              cy="0"
              fill={inputs.color.backgroundColor}
              stroke={inputs.color.foregroundColor}
            />
          </g>
        )}
      </svg> */}

        {/* <Box
          sx={{
            position: "absolute",
            bottom: -20,
            width: "100%",
            height: "1px",
            backgroundColor: "black",
            marginTop: 1,
            textAlign: "center",

            "&:before,&:after": {
              content: '""',
              position: "absolute",
              height: 30,
              width: "1px",
              top: 0,
              backgroundColor: "inherit",
              transform: "translateY(-50%)",
            },

            "&:before": {
              left: 0,
            },
            "&:after": {
              right: 0,
            },
          }}
        >
          <Typography>{dimensionsMap[inputs.size].width} inches</Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: -20,
            height: "100%",
            width: "1px",
            backgroundColor: "black",
            textAlign: "center",

            "&:before,&:after": {
              content: '""',
              position: "absolute",
              width: 30,
              height: "1px",
              left: 0,
              backgroundColor: "inherit",
              transform: "translateX(-50%)",
            },

            "&:before": {
              top: 0,
            },
            "&:after": {
              bottom: 0,
            },
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: 4,
              transform: "translateY(-50%)",
            }}
          >
            {dimensionsMap[inputs.size].height}&nbsp;inches
          </Typography>
        </Box> */}
      </Box>
    </Box>
  )
}
