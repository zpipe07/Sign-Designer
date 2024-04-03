import { SvgProps } from "@/src/components/SVG/types";
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm";

export const TopRoundBorder: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
  borderWidth = 0,
  streetNumber,
  streetName,
  foregroundColor,
  backgroundColor = "#D9D9D9",
  fontFamily,
  decoration,
}) => {
  const Decoration = decoration ? decorationIconMap[decoration] : null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`
          m90.3147
          75h5.9221l2.8468-5.1931c19.5504-35.6637
          57.4214-59.8069
          100.9164-59.8069
          43.495
          0
          81.366
          24.1432
          100.916
          59.8069l2.847
          5.1931h5.922
          70.315c5.523
          0
          10
          4.4771
          10
          10v${height - 105}c0
          5.523-4.477
          10-10
          10h-360c-5.5228
          0-10-4.477-10-10v-${height - 105}c0-5.5229
          4.4772-10
          10-10h70.3147z
        `}
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

      {Decoration && (
        <>
          <Decoration
            height={50}
            width={50}
            x={30}
            y={105}
            color={foregroundColor}
          />

          <Decoration
            height={50}
            width={50}
            x={320}
            y={105}
            transform="scale(-1 1)"
            color={foregroundColor}
          />
        </>
      )}
    </svg>
  );
};
