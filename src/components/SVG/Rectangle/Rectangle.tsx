///<reference path="../../../../node_modules/makerjs/dist/index.d.ts" />

import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"

const TEXT_OFFSET = 2.75

export function generateRectangleModel({
  height,
  width,
  outerBorderWidth,
  innerBorderWidth,
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

  const borderOuter = makerjs.model.outline(
    outer,
    outerBorderWidth,
    undefined,
    true,
  )
  makerjs.model.center(borderOuter)
  const borderInner = makerjs.model.outline(
    borderOuter,
    innerBorderWidth,
    undefined,
    true,
  )
  makerjs.model.center(borderInner)

  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    const { value, fontSize } = textLine

    if (index === 0) {
      // primary
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )

      makerjs.model.center(textModel)

      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 1) {
      // upper
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])

      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 2) {
      // family name
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -TEXT_OFFSET])

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
      viewBox: `0 0 ${width} ${height}`,
    },
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
