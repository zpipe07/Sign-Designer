import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"

function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

const TEXT_OFFSET = 3.0

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
}: SvgProps & { actualDimensions?: boolean }) {
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
        0.65,
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
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
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
      filter: "drop-shadow( 0px 0px 2px rgba(0, 0, 0, 0.5))",
    },
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
}
