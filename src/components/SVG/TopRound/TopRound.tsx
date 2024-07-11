import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { calculateAngle } from "@/src/components/SVG/Ellipse"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"

const TEXT_OFFSET = 3.0

export function generateTopRoundModel({
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
  const outerRect = new makerjs.models.RoundRectangle(
    width,
    (height * 3) / 4,
    0.25,
  )
  const arcRadius = width / 2.25
  const outerEllipse = new makerjs.models.Ellipse(
    arcRadius,
    height / 2,
  )
  const measureOuterEllipse =
    makerjs.measure.modelExtents(outerEllipse)

  makerjs.model.move(outerEllipse, [width / 2, height / 2])

  const outer = makerjs.model.combineUnion(outerRect, outerEllipse)
  const chain = makerjs.model.findSingleChain(outer)
  const filletsModel = makerjs.chain.fillet(chain, 0.25)
  let edge
  let outerModel

  if (inputs.edgeStyle === "round") {
    edge = {
      models: {
        outer,
        filletsModel,
      },
    }
    makerjs.model.center(edge)

    outerModel = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outerModel = {
      models: {
        outer,
        filletsModel,
      },
    }
  }
  makerjs.model.center(outerModel)

  let borderOuter
  let borderInner

  if (innerBorderWidth) {
    borderOuter = makerjs.model.outline(
      outerModel,
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

        if (innerMeasure.width - 0.5 <= textMeasure.width) {
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
      const measure = makerjs.measure.modelExtents(textModel)
      const angle = calculateAngle(measure.width, arcRadius)
      const topArc = new makerjs.paths.Arc(
        [0, 0],
        arcRadius,
        90 - angle / 2,
        90 + angle / 2,
      )

      makerjs.layout.childrenOnPath(
        textModel,
        topArc,
        0.3,
        true,
        true,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])
      text.models[`textModel${index}`] = {
        ...textModel,
      }

      if (validate) {
        const textMeasure = makerjs.measure.modelExtents(textModel)

        if (arcRadius * 2 <= textMeasure.width) {
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

        if (innerMeasure.width - 0.5 <= textMeasure.width) {
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
    const outerMeasure = makerjs.measure.modelExtents(outerModel)

    const boltTopLeft = new makerjs.models.Ellipse(
      BOLT_RADIUS,
      BOLT_RADIUS,
    )
    makerjs.model.move(makerjs.model.center(boltTopLeft), [
      outerMeasure.width / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
      outerMeasure.height / 4 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET -
        (inputs.edgeStyle === "round" ? 0.1 : 0),
    ])

    const boltTopRight = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(makerjs.model.center(boltTopLeft), [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
      outerMeasure.height / 4 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET -
        (inputs.edgeStyle === "round" ? 0.1 : 0),
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

  const topRoundModel = {
    models: {
      edge: { ...edge, layer: "edge" },
      outer: { ...outerModel, layer: "outer" },
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
  const svg = makerjs.exporter.toSVG(topRoundModel, options)

  return { svg }
}

export const TopRound: React.FC<SvgProps> = (props) => {
  const { svg } = generateTopRoundModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  )
}
