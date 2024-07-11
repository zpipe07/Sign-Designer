import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"

export function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

const TEXT_OFFSET = 2.95

export function generateEllipseModel({
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
    edge = new makerjs.models.Ellipse(width / 2, height / 2)
    makerjs.model.center(edge)

    outer = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outer = new makerjs.models.Ellipse(width / 2, height / 2)
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
      const angle = calculateAngle(measure.width, width)
      const topArc = new makerjs.paths.Arc(
        [0, 0],
        width,
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
        const innerMeasure = borderInner
          ? makerjs.measure.modelExtents(borderInner)
          : makerjs.measure.modelExtents(outer)

        if (innerMeasure.width - 3 <= textMeasure.width) {
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
      const measure = makerjs.measure.modelExtents(textModel)
      const angle = calculateAngle(measure.width, width)
      const bottomArc = new makerjs.paths.Arc(
        [0, 0],
        width,
        270 - angle / 2,
        270 + angle / 2,
      )
      makerjs.layout.childrenOnPath(
        textModel,
        bottomArc,
        0.4,
        false,
        true,
        true,
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

        if (innerMeasure.width - 3 <= textMeasure.width) {
          doesTextFit = false
        }
      }

      continue
    }
  }

  if (Object.keys(text.models).length > 0) {
    makerjs.model.center(text)
  }

  let bolts = {} as any
  if (inputs.mountingStyle === "wall mounted") {
    const outerMeasure = makerjs.measure.modelExtents(outer)

    const boltTop = new makerjs.models.Ellipse(
      BOLT_RADIUS,
      BOLT_RADIUS,
    )
    makerjs.model.move(makerjs.model.center(boltTop), [
      0,
      outerMeasure.height / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
    ])

    const boltBottom = makerjs.model.clone(boltTop)
    makerjs.model.move(makerjs.model.center(boltBottom), [
      0,
      outerMeasure.height / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
    ])

    const boltLeft = makerjs.model.clone(boltTop)
    makerjs.model.move(makerjs.model.center(boltLeft), [
      outerMeasure.width / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
      0,
    ])

    const boltRight = makerjs.model.clone(boltTop)
    makerjs.model.move(makerjs.model.center(boltRight), [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
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
