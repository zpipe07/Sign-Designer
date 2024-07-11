import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"

const TEXT_OFFSET = 3

export function generateDonnellyModel({
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
  const leftEllipse = new makerjs.models.Ellipse(
    height / 3,
    height / 2,
  )
  const leftEllipseMeasure = makerjs.measure.modelExtents(leftEllipse)
  makerjs.model.center(leftEllipse)
  makerjs.model.move(leftEllipse, [
    width / -2 + leftEllipseMeasure.width / 2,
    0,
  ])

  const rightEllipse = makerjs.model.mirror(leftEllipse, true, false)
  const outerRect = new makerjs.models.RoundRectangle(
    width - leftEllipseMeasure.width / 3,
    height,
    0.25,
  )
  makerjs.model.center(outerRect)

  const combinedTemp = makerjs.model.combineUnion(
    outerRect,
    leftEllipse,
  )
  const combined = makerjs.model.combineUnion(
    combinedTemp,
    rightEllipse,
  )
  const chain = makerjs.model.findSingleChain(combined)
  const filletsModel = makerjs.chain.fillet(chain, 0.25)

  let edge
  let outer

  if (inputs.edgeStyle === "round") {
    edge = {
      models: {
        combined,
        filletsModel,
      },
    }
    makerjs.model.center(edge)

    outer = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outer = {
      models: {
        combined,
        filletsModel,
      },
    }
  }

  let borderOuter
  let borderInner

  if (innerBorderWidth) {
    borderOuter = makerjs.model.outline(
      outer,
      outerBorderWidth,
      undefined,
      true,
    )
    borderInner = makerjs.model.outline(
      borderOuter,
      innerBorderWidth,
      undefined,
      true,
    )
  }

  let doesTextFit = true
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

      if (validate) {
        const textMeasure = makerjs.measure.modelExtents(textModel)
        const innerMeasure = borderInner
          ? makerjs.measure.modelExtents(borderInner)
          : makerjs.measure.modelExtents(outer)

        if (innerMeasure.width - 0.25 <= textMeasure.width) {
          doesTextFit = false
        }
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

      if (validate) {
        const textMeasure = makerjs.measure.modelExtents(textModel)
        const innerMeasure = borderInner
          ? makerjs.measure.modelExtents(borderInner)
          : makerjs.measure.modelExtents(outer)

        if (innerMeasure.width - 1.125 <= textMeasure.width) {
          doesTextFit = false
        }
      }

      continue
    }

    if (index === 2) {
      // lower
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

      if (validate) {
        const textMeasure = makerjs.measure.modelExtents(textModel)
        const innerMeasure = borderInner
          ? makerjs.measure.modelExtents(borderInner)
          : makerjs.measure.modelExtents(outer)

        if (innerMeasure.width - 1.125 <= textMeasure.width) {
          doesTextFit = false
        }
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
        BOLT_OFFSET +
        leftEllipseMeasure.width / 6,
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
        BOLT_OFFSET -
        leftEllipseMeasure.width / 6,
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
        BOLT_OFFSET +
        leftEllipseMeasure.width / 6,
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
        BOLT_OFFSET -
        leftEllipseMeasure.width / 6,
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

  const topRound = {
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
  const svg = makerjs.exporter.toSVG(topRound, options)

  return { svg }
}

export const Donnelly: React.FC<SvgProps> = (props) => {
  const { svg } = generateDonnellyModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  )
}
