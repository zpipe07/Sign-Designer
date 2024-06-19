import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { Size } from "@/src/components/SignDesigner/types"

const fontSizeMap: { [key in Size]: number } = {
  "extra small": 3.0,
  small: 5.0,
  medium: 4.0,
  large: 4.2,
  "extra large": 4.5,
}

const topArcYMap: { [key in Size]: number } = {
  "extra small": -14.5,
  small: -13,
  medium: -12.25,
  large: -8.5,
  "extra large": -17.5,
}

function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

export function generateBreadModel({
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
    // makerjs.model.center(
    new makerjs.models.EllipticArc(0, 180, width / 2, height / 4),
    // ),
    [0, height / 2],
  )
  const rect = makerjs.model.move(
    // makerjs.model.center(
    new makerjs.models.RoundRectangle(width, (height * 3) / 4, 0.25),
    // ),
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
  makerjs.model.center(outer)
  const borderOuter = makerjs.model.outline(
    outer,
    0.5,
    undefined,
    true,
  )
  const borderInner = makerjs.model.outline(
    borderOuter,
    0.2,
    undefined,
    true,
  )
  let topArc = {} as any
  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    // const chars = textLine.value.length
    const { value, fontSize } = textLine

    if (index === 0) {
      // house number
      // const fontSize = fontSizeMap[inputs.size as Size] - chars * 0.2
      const textModel = new makerjs.models.Text(
        font,
        // textLine.value,
        value,
        fontSize,
        true,
      )
      makerjs.model.center(textModel)
      // const measure = makerjs.measure.modelExtents(textModel)
      // const x = measure.width / -2
      // let y
      // if (inputs.size === "large") {
      //   y = height / 2 - measure.height * 1.3
      // } else if (inputs.size === "small") {
      //   y = 0.3
      // } else {
      //   y = height / 2 - measure.height * 1.0
      // }

      text.models[`textModel${index}`] = {
        ...textModel,
        // origin: [x, y],
      }
      continue
    }

    if (index === 1) {
      // street name
      // const fontSize =
      //   fontSizeMap[inputs.size as Size] - 1 - chars * 0.1
      const textModel = new makerjs.models.Text(
        font,
        // textLine.value,
        value,
        fontSize,
        true,
      )
      // const measure = makerjs.measure.modelExtents(textModel)
      // const x = measure.width / -2
      // const y = -0.4
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -3.0])
      text.models[`textModel${index}`] = {
        ...textModel,
        // origin: [x, y],
      }
      continue
    }

    if (index === 2) {
      // family name
      // const fontSize =
      //   fontSizeMap[inputs.size as Size] - 2.5 - chars * 0.05
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        true,
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
        0.65,
        true,
        false,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, 3.0])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }
  }

  if (textLines.length > 0) {
    makerjs.model.center(text)
  }

  let bolts = {} as any
  if (inputs.mountingStyle === "wall mounted") {
    const boltOffset = 1
    const boldRadius = 0.125
    const boltTop = new makerjs.models.Ellipse(boldRadius, boldRadius)
    makerjs.model.move(makerjs.model.center(boltTop), [
      0,
      height / 2 - boltOffset,
    ])
    const boltBottom = new makerjs.models.Ellipse(
      boldRadius,
      boldRadius,
    )
    makerjs.model.move(makerjs.model.center(boltBottom), [
      0,
      height / -2 + boltOffset,
    ])
    const boltLeft = new makerjs.models.Ellipse(
      boldRadius,
      boldRadius,
    )
    makerjs.model.move(makerjs.model.center(boltLeft), [
      width / -2 + boltOffset,
      0,
    ])
    const boltRight = new makerjs.models.Ellipse(
      boldRadius,
      boldRadius,
    )
    makerjs.model.move(makerjs.model.center(boltRight), [
      width / 2 - boltOffset,
      0,
    ])
    bolts = {
      models: {
        boltTop,
        boltBottom,
        boltLeft,
        boltRight,
      },
    }
  }

  const modelToExport = {
    models: {
      outer: { ...outer, layer: "outer" },
      borderOuter: { ...borderOuter, layer: "borderOuter" },
      borderInner: { ...borderInner, layer: "borderInner" },
      text: { ...text, layer: "text" },
      bolts: { ...bolts, layer: "bolts" },
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
            stroke: "none",
          },
      borderInner: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
            stroke: "none",
          },
      outer: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
            stroke: "none",
          },
      text: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: backgroundColor,
          },
      bolts: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: "white",
            stroke: "none",
          },
      // arc: {
      //   stroke: "blue",
      // },
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
    // fillRule: "nonzero",
    fillRule: "evenodd",
    units: makerjs.unitType.Inch,
  }
  const svg = makerjs.exporter.toSVG(modelToExport, options)

  return { svg }
}

export const Bread: React.FC<SvgProps> = (props) => {
  const { svg } = generateBreadModel(props)

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
