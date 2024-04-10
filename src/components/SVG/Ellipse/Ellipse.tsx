import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import {
  Decoration,
  TextLine,
  decorationIconMap,
} from "@/src/components/SignDesigner/SignDesignerForm"

export const Ellipse: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
  borderWidth = 0,
  inputs,
}) => {
  const Decoration: React.FC<FiligreeProps> | null =
    inputs?.decoration
      ? decorationIconMap[inputs.decoration as Decoration]
      : null

  const textLines: TextLine[] = inputs?.textLines.filter(
    ({ value }: TextLine) => {
      return !!value
    },
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={
        inputs.orientation === "vertical"
          ? `rotate(90) translate(75 0)`
          : ""
      }
    >
      <g
        transform={`translate(${borderWidth / 2},${borderWidth / 2})`}
      >
        <ellipse
          cx={width / 2 - borderWidth / 2}
          cy={height / 2 - borderWidth / 2}
          rx={width / 2 - borderWidth / 2}
          ry={height / 2 - borderWidth / 2}
          fill={inputs?.color.backgroundColor}
          stroke={inputs?.color.foregroundColor}
          strokeWidth={borderWidth}
        />

        {inputs.orientation === "horizontal" &&
          textLines?.map(({ value }, index) => {
            const chars = value.length
            const fontSize = 95 - chars * 3.5
            const y = 70 * index + 170 - textLines.length * 30

            return (
              <text
                y={y}
                x={(width - borderWidth) / 2}
                fontSize={fontSize}
                fontWeight={800}
                alignmentBaseline="middle"
                textAnchor="middle"
                fill={inputs?.color.foregroundColor}
                fontFamily={inputs?.fontFamily}
                key={index}
              >
                {value}
              </text>
            )
          })}

        {inputs.orientation === "vertical" &&
          textLines[0]?.value.split("").map((char, index) => {
            const chars = textLines[0]?.value.length
            const fontSize = 100 - chars * 8
            const x = 200 + index * 60 - chars * 25
            const y = 135

            return (
              <text
                y={y}
                x={x}
                transform={`rotate(-90, ${x}, ${y})`}
                fontSize={fontSize}
                fontWeight={800}
                alignmentBaseline="middle"
                textAnchor="middle"
                fill={inputs?.color.foregroundColor}
                fontFamily={inputs?.fontFamily}
                key={index}
              >
                {char}
              </text>
            )
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
              x={75}
              y={40}
              color={inputs?.color.foregroundColor}
            />

            <Decoration
              height={50}
              width={50}
              x={255}
              y={40}
              transform="scale(-1 1)"
              color={inputs?.color.foregroundColor}
            />
          </>
        )}
      </g>
    </svg>
  )
}
