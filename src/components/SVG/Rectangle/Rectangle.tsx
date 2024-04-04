import { FiligreeProps, SvgProps } from "@/src/components/SVG/types";
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm";

export const Rectangle: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
  borderWidth = 0,
  // streetNumber,
  // streetName,
  textLines,
  foregroundColor,
  backgroundColor = "#D9D9D9",
  fontFamily,
  decoration,
}) => {
  const Decoration: React.FC<FiligreeProps> | null = decoration
    ? decorationIconMap[decoration]
    : null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${borderWidth / 2},${borderWidth / 2})`}>
        <rect
          width={width - borderWidth}
          height={height - borderWidth}
          rx="10"
          fill={backgroundColor}
          stroke={foregroundColor}
          strokeWidth={borderWidth}
        />

        {textLines?.map(({ value }, index) => {
          return (
            <text
              y={60 * index + 55}
              x={(width - borderWidth) / 2}
              fontSize={50}
              fontWeight={800}
              alignmentBaseline="middle"
              textAnchor="middle"
              fill={foregroundColor}
              fontFamily={fontFamily}
              key={value}
            >
              {value}
            </text>
          );
        })}

        {/* {streetNumber && (
          <text
            y={height / 2 - 30}
            x={(width - borderWidth) / 2}
            fontSize={50}
            fontWeight={800}
            alignmentBaseline="middle"
            textAnchor="middle"
            fill={foregroundColor}
            fontFamily={fontFamily}
          >
            {streetNumber}
          </text>
        )} */}

        {/* {streetName && (
          <text
            y={height / 2 + 20}
            x={(width - borderWidth) / 2}
            fontSize={40}
            fontWeight={600}
            alignmentBaseline="middle"
            textAnchor="middle"
            fill={foregroundColor}
            fontFamily={fontFamily}
          >
            {streetName}
          </text>
        )} */}

        {Decoration && (
          <>
            <Decoration
              height={50}
              width={50}
              x={30}
              y={30}
              color={foregroundColor}
            />

            <Decoration
              height={50}
              width={50}
              x={300}
              y={30}
              transform="scale(-1 1)"
              color={foregroundColor}
            />
          </>
        )}
      </g>
    </svg>
  );
};
