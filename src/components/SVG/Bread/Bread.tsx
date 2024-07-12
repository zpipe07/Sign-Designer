import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { calculateAngle } from "@/src/components/SVG/Ellipse"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"

const TEXT_OFFSET = 3.125

export function generateBreadModel({
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
  const arc = makerjs.model.move(
    new makerjs.models.EllipticArc(0, 180, width / 2, height / 4),
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

  let edge
  let outer

  if (inputs.edgeStyle === "round") {
    edge = {
      models: {
        rect,
        arc,
      },
    }
    makerjs.model.center(edge)
    outer = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outer = {
      models: {
        rect,
        arc,
      },
    }
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

    borderInner = makerjs.model.outline(
      borderOuter,
      innerBorderWidth,
      undefined,
      true,
    )
  }

  const text: any = {
    models: {},
  }

  let index = -1

  for (const textLine of textLines) {
    index += 1
    const { value, fontSize, offset } = textLine

    if (!value) {
      continue
    }

    const textModel = new makerjs.models.Text(
      font,
      value,
      parseFloat(fontSize),
    )

    if (index === 0) {
      // primary
      makerjs.model.center(textModel)
      text.models[`textModel${index}`] = {
        ...textModel,
      }
    }

    if (index === 1) {
      // upper
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
        0.5,
        true,
        false,
        true,
      )

      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
    }

    if (index === 2) {
      // lower
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -TEXT_OFFSET])
    }

    if (parseFloat(offset)) {
      makerjs.model.moveRelative(textModel, [0, parseFloat(offset)])
    }

    text.models[`textModel${index}`] = {
      ...textModel,
    }
  }

  let bolts = {} as any
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
      outerMeasure.height / 3 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
    ])

    const boltTopRight = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(boltTopRight, [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
      outerMeasure.height / 3 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
    ])

    const boltBottomRight = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(boltBottomRight, [
      outerMeasure.width / 2 -
        outerBorderWidth -
        innerBorderWidth -
        BOLT_OFFSET,
      outerMeasure.height / -2 +
        outerBorderWidth +
        innerBorderWidth +
        BOLT_OFFSET,
    ])

    const boltBottomLeft = makerjs.model.clone(boltTopLeft)
    makerjs.model.move(boltBottomLeft, [
      outerMeasure.width / -2 +
        outerBorderWidth +
        innerBorderWidth +
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
        boltBottomRight,
        boltBottomLeft,
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

  const breadModel = {
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
  const svg = makerjs.exporter.toSVG(breadModel, options)

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
}
