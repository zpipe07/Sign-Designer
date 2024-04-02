import { SvgProps } from "@/src/components/SVG/types";

export const TopRoundBorder: React.FC<SvgProps> = ({
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
      width="400"
      height="315"
      viewBox="0 0 400 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90.3147 75H96.2368L99.0836 69.8069C118.634 34.1432 156.505 10 200 10C243.495 10 281.366 34.1432 300.916 69.8069L303.763 75H309.685H380C385.523 75 390 79.4771 390 85V295C390 300.523 385.523 305 380 305H20C14.4772 305 10 300.523 10 295V85C10 79.4771 14.4772 75 20 75H90.3147Z"
        fill={backgroundColor}
        stroke={foregroundColor}
        strokeWidth={borderWidth}
      />

      {streetNumber && (
        <text
          y={height / 2 - 20}
          x={width / 2}
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
          y={height / 2 + 30}
          x={width / 2}
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
