import { SvgProps } from "@/src/components/SVG/types"
import { Color, TextLine } from "@/src/components/SignDesigner/types"

export const Bread: React.FC<SvgProps> = ({
  // height = 315,
  // width = 400,
  borderWidth = 0,
  inputs,
}) => {
  const textLines: TextLine[] = inputs.textLines.filter(
    ({ value }: TextLine) => {
      return !!value
    },
  )
  const [foregroundColor, backgroundColor] = inputs.color.split(
    "/",
  ) as Color[]

  return (
    <svg
      viewBox="0 0 400 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M389.991 50.2271L389.917 51.1087L390 51.9896C390 51.9914 390 51.9947 390 52V282H10V52C10 51.9947 10.0002 51.9914 10.0004 51.9896L10.0829 51.1087L10.0094 50.2271C10.0032 50.1521 10 50.0766 10 50C10 48.8147 11.2025 44.8223 20.8053 39.1464C29.7387 33.8662 43.3311 28.7643 61.004 24.3461C96.1958 15.5481 145.343 10 200 10C254.657 10 303.804 15.5481 338.996 24.3461C356.669 28.7643 370.261 33.8662 379.195 39.1464C388.798 44.8223 390 48.8147 390 50C390 50.0766 389.997 50.1521 389.991 50.2271Z"
        fill={backgroundColor}
        stroke={foregroundColor}
        strokeWidth={borderWidth}
      />

      {textLines?.map(({ value }, index) => {
        const chars = value.length
        const fontSize = 90 - chars * 3
        const y = 70 * index + 180 - textLines.length * 30

        return (
          <text
            y={y}
            x={200}
            fontSize={fontSize}
            fontWeight={800}
            alignmentBaseline="middle"
            textAnchor="middle"
            fill={foregroundColor}
            fontFamily={inputs?.fontFamily}
            letterSpacing={1}
            key={index}
          >
            {value}
          </text>
        )
      })}
    </svg>
  )
}
