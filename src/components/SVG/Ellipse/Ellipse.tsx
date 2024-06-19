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
  medium: -12.9,
  large: -12.0,
  "extra large": -20.4,
}

const textOffsetMap: { [key in Size]: number } = {
  "extra small": 0,
  small: 0,
  medium: 0.75,
  large: 0,
  "extra large": 0,
}

function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

export function generateEllipseModel({
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
  const outer = new makerjs.models.Ellipse(width / 2, height / 2)
  const borderOuter = makerjs.model.outline(
    outer,
    0.5,
    undefined,
    true,
  )
  const borderInner = makerjs.model.outline(
    outer,
    0.7,
    undefined,
    true,
  )
  let topArc = {} as any
  let bottomArc = {} as any
  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    // if (inputs.orientation === "horizontal") {
    const index = Object.keys(text.models).length
    // const chars = textLine.value.length
    const { value, fontSize } = textLine

    if (index === 0) {
      // house number
      // const fontSize = fontSizeMap[inputs.size as Size] - chars * 0.3
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
      // const y = measure.height / -2 + textOffsetMap[inputs.size]

      text.models[`textModel${index}`] = {
        ...textModel,
        // origin: [x, y],
      }
      continue
    }

    if (index === 1) {
      // street name
      // const fontSize =
      //   fontSizeMap[inputs.size as Size] - 2.5 - chars * 0.05
      const textModel = new makerjs.models.Text(
        font,
        // textLine.value,
        value,
        fontSize,
        true,
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const angle = calculateAngle(measure.width, width)
      bottomArc = new makerjs.paths.Arc(
        [0, -1 * topArcYMap[inputs.size as Size]],
        width,
        270 - angle / 2,
        270 + angle / 2,
      )
      makerjs.layout.childrenOnPath(
        textModel,
        bottomArc,
        0.4,
        false,
        false,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -2.75])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 2) {
      // family name
      // const fontSize =
      //   fontSizeMap[inputs.size as Size] - 2.5 - chars * 0.05
      const textModel = new makerjs.models.Text(
        font,
        // textLine.value,
        value,
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
        0.3,
        true,
        false,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, 2.75])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }
    // } else if (inputs.orientation === "vertical") {
    //   textLine.value.split("").forEach((char, index) => {
    //     const chars = textLine.value.length
    //     const fontSize = 300 - chars * 10
    //     const textModel = new makerjs.models.Text(
    //       font,
    //       char,
    //       fontSize,
    //       true,
    //       false,
    //       0,
    //       {},
    //     )
    //     const measure = makerjs.measure.modelExtents(textModel)
    //     const x = measure?.width / -2
    //     const y =
    //       (chars - 1) * 125 - 250 * index - measure?.height / 2

    //     // @ts-ignore
    //     textModel.origin = [x, y]
    //     // @ts-ignore
    //     textModel.layer = "text"
    //     // @ts-ignore
    //     textModels[`textModel${index}`] = textModel
    //   })
    // }
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
      (-1 * height) / 2 + boltOffset,
    ])
    const boltLeft = new makerjs.models.Ellipse(
      boldRadius,
      boldRadius,
    )
    makerjs.model.move(makerjs.model.center(boltLeft), [
      (-1 * width) / 2 + boltOffset,
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

  const tabletFaceMount = {
    models: {
      outer: { ...outer, layer: "outer" },
      borderOuter: { ...borderOuter, layer: "borderOuter" },
      borderInner: { ...borderInner, layer: "borderInner" },
      text: { ...text, layer: "text" },
      bolts: { ...bolts, layer: "bolts" },
    },
    paths: {
      // topArc: { ...topArc, layer: "arc" },
      // bottomArc: { ...bottomArc, layer: "arc" },
    },
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
    units: makerjs.unitType.Inch,
  }
  const svg = makerjs.exporter.toSVG(tabletFaceMount, options)

  return { svg }
}

export const Ellipse: React.FC<SvgProps> = (props) => {
  const { svg } = generateEllipseModel(props)

  return (
    <div
      style={{
        height: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
