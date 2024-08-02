import makerjs from "makerjs"
import memoizee from "memoizee"

import { SvgProps } from "@/src/components/SVG/types"
import { calculateAngle } from "@/src/components/SVG/Ellipse"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  EDGE_WIDTH,
  formatSvg,
  getSvgOptions,
  makeInnerOutline,
} from "@/src/utils/makerjs"
import { TextLine } from "@/src/components/SignDesigner/types"

const TEXT_OFFSET = 3.125

const makeTextModel = memoizee(
  (
    textLines: TextLine[],
    font: opentype.Font,
    width: number,
    validate: boolean | undefined,
    borderInner: makerjs.IModel | undefined,
    outer: makerjs.IModel,
  ) => {
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
        true,
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

    return { doesTextFit, text }
  },
)

const makeBoltsModel = memoizee(
  (outer, outerBorderWidth, innerBorderWidth) => {
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

    return {
      models: {
        boltTopLeft,
        boltTopRight,
        boltBottomRight,
        boltBottomLeft,
      },
    }
  },
)

export function generateBreadModel(props: SvgProps) {
  const {
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
  } = props
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
    outer = makeInnerOutline(edge, EDGE_WIDTH)
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
    borderOuter = makeInnerOutline(outer, outerBorderWidth)
    borderInner = makeInnerOutline(borderOuter, innerBorderWidth)
  }

  const { doesTextFit, text } = makeTextModel(
    textLines,
    font,
    width,
    validate,
    borderInner,
    outer,
  )

  let bolts = {} as makerjs.IModel
  if (inputs.mountingStyle === "wall mounted") {
    bolts = makeBoltsModel(outer, outerBorderWidth, innerBorderWidth)
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
  const options = getSvgOptions({ ...props, doesTextFit })
  const svg = makerjs.exporter.toSVG(breadModel, options)
  const formattedSvg = formatSvg(svg, !!showShadow)

  return { svg: formattedSvg }
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
