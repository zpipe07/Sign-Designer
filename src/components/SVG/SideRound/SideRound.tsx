import { SvgProps } from "@/src/components/SVG/types"
import { TextLine } from "@/src/components/SignDesigner/SignDesignerForm"

export const SideRound: React.FC<SvgProps> = ({
  height,
  width,
  borderWidth,
  inputs,
}) => {
  const textLines: TextLine[] = inputs.textLines.filter(
    ({ value }: any) => {
      return !!value
    },
  )

  return (
    <svg
      viewBox="0 0 480 200"
      fill="none"
      transform={
        inputs.orientation === "vertical"
          ? `rotate(90) translate(100 0)`
          : ""
      }
    >
      <path
        d="M430 26.5003V33.9087L437.087 36.0667C445.284 38.5625 453.491 45.6252 459.8 57.0755C466.054 68.4254 470 83.3747 470 100C470 116.625 466.054 131.575 459.8 142.925C453.491 154.375 445.284 161.437 437.087 163.933L430 166.091V173.5V190H50.0001V173.5V166.091L42.9129 163.933C34.7159 161.437 26.5095 154.375 20.2001 142.925C13.946 131.575 10.0001 116.625 10.0001 100C10.0001 83.3747 13.946 68.4254 20.2001 57.0755C26.5095 45.6252 34.7159 38.5625 42.9129 36.0667L50.0001 33.9087V26.5003V10H430V26.5003Z"
        fill={inputs?.color.backgroundColor}
        stroke={inputs?.color.foregroundColor}
        stroke-width="20"
      />

      {inputs.orientation === "horizontal" &&
        textLines?.map(({ value }: any, index: any) => {
          const yOffset = 120 - textLines.length * 20

          return (
            <text
              y={60 * index + yOffset}
              x={width / 2 + borderWidth * 2}
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
        textLines[0]?.value.split("").map((char, index) => {
          const x = 140 + index * 60
          const y = 100

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
    </svg>
  )
}
