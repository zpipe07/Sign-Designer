import { SvgProps } from "@/src/components/SVG/types";

export const Rectangle: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
  streetNumber,
  streetName,
  foregroundColor,
  backgroundColor = "#D9D9D9",
  fontFamily,
}) => {
  const borderWidth = 20;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="400"
        height="315"
        rx="10"
        fill={backgroundColor}
        stroke={foregroundColor}
        strokeWidth={borderWidth}
      />

      {streetNumber && (
        <text
          y={75}
          x={(width - borderWidth * 2) / 2}
          fontSize={50}
          fontWeight={800}
          alignmentBaseline="middle"
          textAnchor="middle"
          fill={foregroundColor}
          fontFamily={fontFamily}
        >
          {streetNumber}
        </text>
      )}

      {streetName && (
        <text
          y={125}
          x={(width - borderWidth * 2) / 2}
          fontSize={40}
          fontWeight={600}
          alignmentBaseline="middle"
          textAnchor="middle"
          fill={foregroundColor}
          fontFamily={fontFamily}
        >
          {streetName}
        </text>
      )}
    </svg>
  );
};
