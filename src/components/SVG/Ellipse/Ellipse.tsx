import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"

function calculateAngle(arcLength: number, radius: number) {
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
}: SvgProps & { actualDimensions?: boolean; showShadow?: boolean }) {
  let edge
  let outer

  if (inputs.edgeStyle === "round") {
    edge = new makerjs.models.Ellipse(width / 2, height / 2)
    makerjs.model.center(edge)

    outer = makerjs.model.outline(edge, 0.2, undefined, true)
  } else {
    outer = new makerjs.models.Ellipse(width / 2, height / 2)
  }

  const borderOuter = makerjs.model.outline(
    outer,
    outerBorderWidth,
    undefined,
    true,
  )
  const borderInner = makerjs.model.outline(
    borderOuter,
    innerBorderWidth,
    undefined,
    true,
  )

  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    const { value, fontSize } = textLine

    if (index === 0) {
      // primary
      const textModel = new makerjs.models.Text(font, value, fontSize)
      makerjs.model.center(textModel)

      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 1) {
      // upper
      const textModel = new makerjs.models.Text(font, value, fontSize)
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
      continue
    }

    if (index === 2) {
      // lower
      const textModel = new makerjs.models.Text(font, value, fontSize)
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
            stroke: "none",
          },
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
      ...(showShadow && {
        filter: "drop-shadow( 0px 0px 2px rgba(0, 0, 0, 0.5))",
      }),
    },
    units: makerjs.unitType.Inch,
    fillRule: "nonzero",
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
