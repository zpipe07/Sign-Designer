import Box from "@mui/material/Box";

import { Inputs } from "@/src/components/SignDesigner/SignDesignerForm";
import { Rectangle } from "@/src/components/SVG/Rectangle";
import { Ellipse } from "@/src/components/SVG/Ellipse";
import { TopRound } from "@/src/components/SVG/TopRound";

type Props = {
  inputs: Inputs;
};

export const SignDesignerVisualizer: React.FC<Props> = ({ inputs }) => {
  const width = 400;
  const height = 250;
  const borderWidth = 20;

  return (
    <Box display="flex" justifyContent="center">
      {inputs.shape === "rectangle" && (
        <Rectangle
          streetNumber={inputs.streetNumber}
          streetName={inputs.streetName}
          foregroundColor={inputs.color.foregroundColor}
          backgroundColor={inputs.color.backgroundColor}
          fontFamily={inputs.fontFamily}
        />
      )}

      {inputs.shape === "ellipse" && <Ellipse />}

      {inputs.shape === "topRound" && <TopRound />}
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
    </Box>
  );
};
