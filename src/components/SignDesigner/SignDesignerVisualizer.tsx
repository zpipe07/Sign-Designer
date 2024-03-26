import Box from "@mui/material/Box";

import { Inputs } from "@/src/components/SignDesigner/SignDesignerForm";

type Props = {
  inputs: Inputs;
};

export const SignDesignerVisualizer: React.FC<Props> = ({ inputs }) => {
  return (
    <Box display="flex" justifyContent="center">
      <svg height="300" width="300">
        {inputs.shape === "rectangular" && (
          <g transform="translate(0,0)">
            <rect
              width="300"
              height="150"
              fill={inputs.backgroundColor}
              opacity={0.75}
            />

            {inputs.texts.map(({ text }, index) => (
              <text
                x="150"
                y={index * 15 + 75 - inputs.texts.length * 5}
                fill={inputs.textColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {text}
              </text>
            ))}
          </g>
        )}

        {inputs.shape === "circular" && (
          <g transform="translate(150,150)">
            <circle
              r="150"
              cx="0"
              cy="0"
              fill={inputs.backgroundColor}
              opacity={0.75}
            />

            {inputs.texts.map(({ text }, index) => (
              <text
                x="0"
                y="0"
                fill={inputs.textColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {text}
              </text>
            ))}
          </g>
        )}
      </svg>
    </Box>
  );
};
