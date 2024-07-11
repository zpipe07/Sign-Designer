///<reference path="../../../../node_modules/makerjs/dist/index.d.ts" />

import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_RADIUS,
  BOLT_OFFSET,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"

const TEXT_OFFSET = 3

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
  showShadow,
  validate,
}: SvgProps) {
  let edge
  let outer

  if (inputs.edgeStyle === "round") {
    edge = new makerjs.models.RoundRectangle(width, height, 0.25)
    makerjs.model.center(edge)

    outer = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outer = new makerjs.models.RoundRectangle(width, height, 0.25)
  }

  makerjs.model.center(outer)

  let borderOuter
  let borderInner

  if (innerBorderWidth) {
    borderOuter = makerjs.model.outline(
      outer,
      outerBorderWidth,
      undefined,
      true,
    )
    makerjs.model.center(borderOuter)
    borderInner = makerjs.model.outline(
      borderOuter,
      innerBorderWidth,
      undefined,
      true,
    )
    makerjs.model.center(borderInner)
  }

  const text: any = {
    models: {},
  }

  let index = -1

  for (const textLine of textLines) {
    index += 1
    const { value, fontSize } = textLine

    if (!value) {
      continue
    }

    if (index === 0) {
      // primary

      const textModel = new makerjs.models.Text(
        font,
        value,
        parseFloat(fontSize),
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
        parseFloat(fontSize),
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
        parseFloat(fontSize),
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -TEXT_OFFSET])

      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }
  }

  if (Object.keys(text.models).length > 0) {
    makerjs.model.center(text)
  }

  let bolts = {}
  if (inputs.mountingStyle === "wall mounted") {
    const outerMeasure = makerjs.measure.modelExtents(outer)

    const boltTopLeft = new makerjs.models.Ellipse(
      BOLT_RADIUS,
      BOLT_RADIUS,
    )
    makerjs.model.move(makerjs.model.center(boltTopLeft), [
      outerMeasure.width / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
      outerMeasure.height / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
    ])

    const boltTopRight = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(makerjs.model.center(boltTopLeft), [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
      outerMeasure.height / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
    ])

    const boltBottomLeft = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(makerjs.model.center(boltBottomLeft), [
      outerMeasure.width / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
      outerMeasure.height / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
    ])

    const boltBottomRight = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(makerjs.model.center(boltBottomRight), [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
      outerMeasure.height / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
    ])

    bolts = {
      models: {
        boltTopLeft,
        boltTopRight,
        boltBottomLeft,
        boltBottomRight,
      },
    }
  }

  let doesTextFit = true

  if (validate) {
    const outerMeasure = borderInner
      ? makerjs.measure.modelExtents(borderInner)
      : makerjs.measure.modelExtents(outer)
    const textMeasure = makerjs.measure.modelExtents(text)

    if (textMeasure) {
      doesTextFit =
        outerMeasure.width > textMeasure.width &&
        outerMeasure.height > textMeasure.height
    }
  }

  const rectangleModel = {
    models: {
      edge: { ...edge, layer: "edge" },
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
      edge: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
          },
      borderOuter: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
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
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
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
      ...(validate && { "data-does-text-fit": doesTextFit }),
      ...(showShadow && {
        filter: "drop-shadow( 0px 0px 2px rgba(0, 0, 0, 0.5))",
      }),
    },
    units: makerjs.unitType.Inch,
    fillRule: "evenodd",
  }
  const svg = makerjs.exporter.toSVG(rectangleModel, options)

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
