import makerjs from "makerjs"
import jsdom from "jsdom"
import memoize from "memoizee"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { EDGE_WIDTH, makeInnerOutline } from "@/src/utils/makerjs"
import { TextLine } from "@/src/components/SignDesigner/types"

const { JSDOM } = jsdom

export function calculateAngle(arcLength: number, radius: number) {
  const angle = (arcLength / radius) * (180 / Math.PI)
  return angle
}

const TEXT_OFFSET = 3.75

const makeTextModel = memoize(
  (
    textLines: TextLine[],
    font: opentype.Font,
    width: number,
    height: number,
    validate: boolean | undefined,
    borderInner: makerjs.IModel | undefined,
    outer: makerjs.IModel,
  ) => {
    let doesTextFit = true
    const text: makerjs.IModel = {
      models: {},
      paths: {},
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
        true,
        true,
      )

      if (index === 0) {
        // primary
        makerjs.model.center(textModel)

        if (validate) {
          const textMeasure = makerjs.measure.modelExtents(textModel)
          const innerMeasure = borderInner
            ? makerjs.measure.modelExtents(borderInner)
            : makerjs.measure.modelExtents(outer)

          if (innerMeasure.width - 0.5 <= textMeasure.width) {
            doesTextFit = false
          }
        }
      }

      if (index === 1) {
        // upper
        const measure = makerjs.measure.modelExtents(textModel)
        const angle = calculateAngle(measure.width * 1.25, width / 2)
        const ellipticArc = new makerjs.models.EllipticArc(
          90 - angle / 2,
          90 + angle / 2,
          width / 2.25,
          height / 2.25,
        )
        const chain = makerjs.model.findSingleChain(ellipticArc)

        makerjs.layout.childrenOnChain(
          textModel,
          chain,
          0,
          false,
          true,
        )
        makerjs.model.center(textModel)
        makerjs.model.moveRelative(textModel, [
          0,
          TEXT_OFFSET - measure.height / 2,
        ])

        if (validate) {
          const textMeasure = makerjs.measure.modelExtents(textModel)
          const innerMeasure = borderInner
            ? makerjs.measure.modelExtents(borderInner)
            : makerjs.measure.modelExtents(outer)

          if (innerMeasure.width - 1 <= textMeasure.width) {
            doesTextFit = false
          }
        }
      }

      if (index === 2) {
        // lower
        const measure = makerjs.measure.modelExtents(textModel)
        const angle = calculateAngle(measure.width, width / 2)
        const ellipticArc = new makerjs.models.EllipticArc(
          270 - angle / 2,
          270 + angle / 2,
          width / 2.25,
          height / 2.25,
        )
        const chain = makerjs.model.findSingleChain(ellipticArc)

        makerjs.layout.childrenOnChain(
          textModel,
          chain,
          1.5,
          true,
          false,
        )
        makerjs.model.center(textModel)
        makerjs.model.moveRelative(textModel, [
          0,
          -TEXT_OFFSET + measure.height / 2,
        ])

        if (validate) {
          const textMeasure = makerjs.measure.modelExtents(textModel)
          const innerMeasure = borderInner
            ? makerjs.measure.modelExtents(borderInner)
            : makerjs.measure.modelExtents(outer)

          if (innerMeasure.width - 1 <= textMeasure.width) {
            doesTextFit = false
          }
        }
      }

      if (parseFloat(offset)) {
        makerjs.model.moveRelative(textModel, [0, parseFloat(offset)])
      }

      // @ts-ignore
      text.models[`textModel${index}`] = {
        ...textModel,
      }
    }

    return { doesTextFit, text }
  },
)

const makeBoltsModel = memoize(
  (outer, outerBorderWidth, innerBorderWidth) => {
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

    return {
      models: {
        boltTop,
        boltBottom,
        boltLeft,
        boltRight,
      },
    }
  },
)

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

    outer = makeInnerOutline(edge, EDGE_WIDTH)
  } else {
    outer = new makerjs.models.Ellipse(width / 2, height / 2)
  }

  let borderOuter
  let borderInner

  if (innerBorderWidth) {
    borderOuter = makeInnerOutline(outer, outerBorderWidth)
    borderInner = makeInnerOutline(borderOuter, innerBorderWidth)
  }

  const { doesTextFit, text } = makeTextModel(
    textLines,
    font,
    width,
    height,
    validate,
    borderInner,
    outer,
  )

  let bolts = {} as makerjs.IModel

  if (inputs.mountingStyle === "wall mounted") {
    bolts = makeBoltsModel(outer, outerBorderWidth, innerBorderWidth)
  }

  const ellipseModel = {
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
  const svg = makerjs.exporter.toSVG(ellipseModel, options)
  const dom = new JSDOM(svg)

  if (strokeOnly) {
    // update the svg file to render layers in Vcarve
    dom.window.document.querySelectorAll("path").forEach((path) => {
      path.setAttribute("fill-rule", "evenodd")
      const id = path.getAttribute("id")

      if (id) {
        const group = dom.window.document.createElement("g")

        path.parentNode?.insertBefore(group, path)
        group.appendChild(path)
        group.setAttribute("inkscape:groupmode", "layer")
        group.setAttribute("inkscape:label", id)
        group.setAttribute("id", id)
      }
    })
  }

  const oldGroup = dom.window.document.getElementById("svgGroup")

  oldGroup?.replaceWith(...oldGroup.childNodes)

  return { svg: dom.window.document.body.innerHTML }
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
