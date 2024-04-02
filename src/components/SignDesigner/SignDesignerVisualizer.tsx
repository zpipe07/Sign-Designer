import Box from "@mui/material/Box";

import { Inputs } from "@/src/components/SignDesigner/SignDesignerForm";

type Props = {
  inputs: Inputs;
};

export const SignDesignerVisualizer: React.FC<Props> = ({ inputs }) => {
  const width = 400;
  const height = 250;
  const borderWidth = 20;

  return (
    <Box display="flex" justifyContent="center">
      <svg height="400" width="400">
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

            {/* {inputs.texts.map(({ text, fontSize }, index) => (
              <text
                x="200"
                y={index * 25 + 100 - inputs.texts.length * 5}
                fill={inputs.color.foregroundColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize={fontSize}
              >
                {text}
              </text>
            ))} */}
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

            {/* {inputs.texts.map(({ text, fontSize }, index) => (
              <text
                x="0"
                y={index * 25 - inputs.texts.length * 5}
                fill={inputs.color.foregroundColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize={fontSize}
              >
                {text}
              </text>
            ))} */}
          </g>
        )}
      </svg>
    </Box>
  );
};
