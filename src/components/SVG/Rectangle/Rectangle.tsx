import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import {
  Decoration,
  TextLine,
  decorationIconMap,
} from "@/src/components/SignDesigner/SignDesignerForm"

const defaultColor = "#D9D9D9"

export const Rectangle: React.FC<SvgProps> = ({
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
      // width={width}
      // height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={
        inputs.orientation === "vertical" ? `rotate(90)` : ""
      }
    >
      <g
        transform={`translate(${borderWidth / 2},${borderWidth / 2})`}
      >
        <rect
          width={width - borderWidth}
          height={height - borderWidth}
          rx="10"
          fill={inputs?.color.backgroundColor || defaultColor}
          stroke={inputs?.color.foregroundColor}
          strokeWidth={borderWidth}
        />

        {inputs.orientation === "horizontal" &&
          textLines?.map(({ value }: TextLine, index: number) => {
            const yOffset = 130 - textLines.length * 20

            return (
              <text
                y={50 * index + yOffset}
                x={(width - borderWidth) / 2}
                fontSize={50}
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
          textLines[0]?.value
            .split("")
            .map((char: string, index: number) => {
              const x = 100 + index * 50
              const y = 110

              return (
                <text
                  y={y}
                  x={x}
                  transform={`rotate(-90, ${x}, ${y})`}
                  fontSize={50}
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
              x={30}
              y={30}
              color={inputs?.color.foregroundColor}
            />

            <Decoration
              height={50}
              width={50}
              x={300}
              y={30}
              transform="scale(-1 1)"
              color={inputs?.color.foregroundColor}
            />
          </>
        )}
      </g>
    </svg>
  )
}
