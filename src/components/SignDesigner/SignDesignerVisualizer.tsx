import Box from "@mui/material/Box";

import { Inputs } from "@/src/components/SignDesigner/SignDesignerForm";

type Props = {
  inputs: Inputs;
};

export const SignDesignerVisualizer: React.FC<Props> = ({ inputs }) => {
  return (
    <Box display="flex" justifyContent="center">
      <svg height="400" width="400">
        {inputs.shape === "rectangular" && (
          <g transform="translate(0,0)">
            <rect
              width="400"
              height="200"
              fill={inputs.backgroundColor}
              opacity={0.75}
            />

            {inputs.texts.map(({ text, fontSize }, index) => (
              <text
                x="200"
                y={index * 25 + 100 - inputs.texts.length * 5}
                fill={inputs.textColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize={fontSize}
              >
                {text}
              </text>
            ))}
          </g>
        )}

        {inputs.shape === "circular" && (
          <g transform="translate(200,200)">
            <circle
              r="200"
              cx="0"
              cy="0"
              fill={inputs.backgroundColor}
              opacity={0.75}
            />

            {inputs.texts.map(({ text, fontSize }, index) => (
              <text
                x="0"
                y={index * 25 - inputs.texts.length * 5}
                fill={inputs.textColor}
                key={text}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize={fontSize}
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
