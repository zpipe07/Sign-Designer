import { Inputs } from "@/src/components/SignDesigner/SignDesignerForm";

type Props = {
  inputs: Inputs;
};

export const SignDesignerVisualizer: React.FC<Props> = ({ inputs }) => {
  return (
    <svg>
      {inputs.shape === "rectangular" && (
        <rect width="200" height="100" fill="blue" opacity={0.25} />
      )}

      {inputs.shape === "circular" && (
        <circle r="50" cx="50" cy="50" fill="blue" opacity={0.25} />
      )}

      {inputs.texts.map(({ text }, index) => (
        <text
          x="5"
          y={index * 20 + 15}
          fill="red"
          key={text}
          dominantBaseline="middle"
        >
          {text}
        </text>
      ))}
    </svg>
  );
};
