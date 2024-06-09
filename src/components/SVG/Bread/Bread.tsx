import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { Size } from "@/src/components/SignDesigner/types"

const fontSizeMap: { [key in Size]: number } = {
  "extra small": 3.5,
  small: 4.75,
  medium: 4.5,
  large: 4.5,
  "extra large": 4.75,
}
const topArcYMap: { [key in Size]: number } = {
  "extra small": -14.5,
  small: -13,
  medium: -12.25,
  large: -9,
  "extra large": -17.5,
}

function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

function generateModel({
  height,
  width,
  borderWidth,
  inputs,
  textLines,
  foregroundColor,
  backgroundColor,
  font,
  strokeOnly,
  actualDimensions,
}: SvgProps & { actualDimensions?: boolean }) {
  const arc = makerjs.model.move(
    makerjs.model.center(
      new makerjs.models.EllipticArc(0, 180, width / 2, height / 4),
      true,
      false,
    ),
    [0, height / 2],
  )
  const rect = makerjs.model.move(
    new makerjs.models.RoundRectangle(width, (height * 3) / 4, 0.25),
    [(-1 * width) / 2, (-1 * height) / 4],
  )

  delete rect.paths?.Top
  delete rect.paths?.TopLeft
  delete rect.paths?.TopRight

  // @ts-ignore
  rect.paths.Left.origin = [0, (height * 3) / 4]
  // @ts-ignore
  rect.paths.Right.end = [width, (height * 3) / 4]

  const outer = {
    models: {
      rect,
      arc,
    },
  }
  const borderOuter = makerjs.model.outline(
    outer,
    0.5,
    undefined,
    true,
  )
  const borderInner = makerjs.model.outline(
    borderOuter,
    0.3,
    undefined,
    true,
  )
  let topArc = {} as any
  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    const chars = textLine.value.length

    if (index === 0) {
      // house number
      const fontSize = fontSizeMap[inputs.size as Size] - chars * 0.3
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        true,
        false,
        0,
        {},
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = measure.width / -2
      const y = height / 4 - measure.height / 2

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 1) {
      // street name
      const fontSize = fontSizeMap[inputs.size as Size] - chars * 0.3
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        true,
        false,
        0,
        {},
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = measure.width / -2
      const y = measure.height / -2

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 2) {
      // family name
      const fontSize =
        fontSizeMap[inputs.size as Size] - 2.5 - chars * 0.05
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        true,
        false,
        0,
        {},
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const angle = calculateAngle(measure.width, width)
      topArc = new makerjs.paths.Arc(
        [0, topArcYMap[inputs.size as Size]],
        width,
        90 - angle / 2,
        90 + angle / 2,
      )
      makerjs.layout.childrenOnPath(
        textModel,
        topArc,
        0.5,
        true,
        false,
        true,
      )
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }
  }

  const modelToExport = {
    models: {
      outer: { ...outer, layer: "outer" },
      borderOuter: { ...borderOuter, layer: "borderOuter" },
      borderInner: { ...borderInner, layer: "borderInner" },
      text: { ...text, layer: "text" },
    },
    paths: {},
  }
  const strokeOnlyStyle = { fill: "none", stroke: "black" }
  const options: makerjs.exporter.ISVGRenderOptions = {
    layerOptions: {
      borderOuter: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
          },
      borderInner: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
          },
      outer: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
          },
      text: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: backgroundColor,
          },
      arc: {
        stroke: "blue",
      },
    },
    viewBox: true,
    svgAttrs: {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:inkscape": "http://www.inkscape.org/namespaces/inkscape",
      id: "svg2",
      version: "1.1",
      height: actualDimensions ? `${height}in` : "100%",
      width: actualDimensions ? `${width}in` : "100%",
      // height: `${height}in`,
      // width: `${width}in`,
      viewBox: `0 0 ${width} ${height}`,
    },
    fillRule: "nonzero",
    units: makerjs.unitType.Inch,
  }
  const svg = makerjs.exporter.toSVG(modelToExport, options)

  return { svg }
}

export const Bread: React.FC<SvgProps> = (props) => {
  const { svg } = generateModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )

  // return (
  //   <svg
  //     viewBox="0 0 400 292"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M389.991 50.2271L389.917 51.1087L390 51.9896C390 51.9914 390 51.9947 390 52V282H10V52C10 51.9947 10.0002 51.9914 10.0004 51.9896L10.0829 51.1087L10.0094 50.2271C10.0032 50.1521 10 50.0766 10 50C10 48.8147 11.2025 44.8223 20.8053 39.1464C29.7387 33.8662 43.3311 28.7643 61.004 24.3461C96.1958 15.5481 145.343 10 200 10C254.657 10 303.804 15.5481 338.996 24.3461C356.669 28.7643 370.261 33.8662 379.195 39.1464C388.798 44.8223 390 48.8147 390 50C390 50.0766 389.997 50.1521 389.991 50.2271Z"
  //       fill={backgroundColor}
  //       stroke={foregroundColor}
  //       strokeWidth={borderWidth}
  //     />

  //     {textLines?.map(({ value }, index) => {
  //       const chars = value.length
  //       const fontSize = 90 - chars * 3
  //       const y = 70 * index + 180 - textLines.length * 30

  //       return (
  //         <text
  //           y={y}
  //           x={200}
  //           fontSize={fontSize}
  //           fontWeight={800}
  //           alignmentBaseline="middle"
  //           textAnchor="middle"
  //           fill={foregroundColor}
  //           fontFamily={inputs?.fontFamily}
  //           letterSpacing={1}
  //           key={index}
  //         >
  //           {value}
  //         </text>
  //       )
  //     })}
  //   </svg>
  // )
}
