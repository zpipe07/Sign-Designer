///<reference path="../../../../node_modules/makerjs/dist/index.d.ts" />

import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { Size } from "@/src/components/SignDesigner/types"

const fontSizeMap: { [key in Size]: number } = {
  "extra small": 2.5,
  small: 3.0,
  medium: 4.0,
  large: 4.0,
  "extra large": 4.0,
}

const textOffsetMap: { [key in Size]: number } = {
  "extra small": 0,
  small: 0,
  medium: 1.125,
  large: 0,
  "extra large": 0,
}

export function generateRectangleModel({
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
  const outer = new makerjs.models.RoundRectangle(width, height, 0.25)
  makerjs.model.center(outer)
  const borderInner = makerjs.model.outline(
    outer,
    0.7,
    undefined,
    true,
  )
  makerjs.model.center(borderInner)
  const borderOuter = makerjs.model.outline(
    borderInner,
    0.2,
    undefined,
  )
  makerjs.model.center(borderOuter)

  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    const chars = textLine.value.length

    if (index === 0) {
      // house number
      const fontSize =
        fontSizeMap[inputs.size as Size] - Math.log10(chars)
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        false,
        false,
      )
      makerjs.model.center(textModel)
      const measure = makerjs.measure.modelExtents(textModel)
      const x = measure.width / -2
      const y = measure.height / -2 + textOffsetMap[inputs.size]

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 1) {
      // street name
      const fontSize =
        fontSizeMap[inputs.size as Size] - 1 - chars * 0.1
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = measure.width / -2
      const y = (height * -1) / 2 + 1.5 + textOffsetMap[inputs.size]

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 2) {
      // family name
      const fontSize =
        fontSizeMap[inputs.size as Size] - 1 - chars * 0.1
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = measure.width / -2
      const y =
        height / 2 -
        measure.height * 1 -
        1.5 +
        textOffsetMap[inputs.size]

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }
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
      // inner: inner,
      // ...textModels,
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
            // stroke: "none",
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
    // nonzero | evenodd
    fillRule: "nonzero",
    units: makerjs.unitType.Inch,
  }
  const svg = makerjs.exporter.toSVG(tabletFaceMount, options)

  return { svg }
}

export const Rectangle: React.FC<SvgProps> = (props) => {
  const { svg } = generateRectangleModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
