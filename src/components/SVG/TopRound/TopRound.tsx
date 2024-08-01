import makerjs from "makerjs"
import memoize from "memoizee"

import { SvgProps } from "@/src/components/SVG/types"
import { calculateAngle } from "@/src/components/SVG/Ellipse"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  EDGE_WIDTH,
  getSvgOptions,
  makeInnerOutline,
} from "@/src/utils/makerjs"
import { TextLine } from "@/src/components/SignDesigner/types"

const TEXT_OFFSET = 3.0

const makeTextModel = memoize(
  (
    textLines: TextLine[],
    font: opentype.Font,
    validate: boolean | undefined,
    borderInner: makerjs.IModel | undefined,
    outer: makerjs.IModel,
    arcRadius: number,
  ) => {
    let doesTextFit = true
    const text: makerjs.IModel = {
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
        const angle = calculateAngle(measure.width, arcRadius)
        const ellipticArc = new makerjs.models.EllipticArc(
          90 - angle / 2,
          90 + angle / 2,
          arcRadius,
          arcRadius,
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
        makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])

        if (validate) {
          const textMeasure = makerjs.measure.modelExtents(textModel)

          if (arcRadius * 2 <= textMeasure.width) {
            doesTextFit = false
          }
        }
      }

      if (index === 2) {
        // lower
        makerjs.model.center(textModel)
        makerjs.model.moveRelative(textModel, [0, -TEXT_OFFSET])

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

      if (parseFloat(offset)) {
        makerjs.model.moveRelative(textModel, [0, parseFloat(offset)])
      }

      if (text.models) {
        text.models[`textModel${index}`] = {
          ...textModel,
        }
      }
    }

    return { doesTextFit, text }
  },
)

const makeBoltsModel = memoize(
  (outer, outerBorderWidth, innerBorderWidth, inputs) => {
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

    return {
      models: {
        boltTopLeft,
        boltTopRight,
        boltBottomLeft,
        boltBottomRight,
      },
    }
  },
)

export function generateTopRoundModel(props: SvgProps) {
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

    outerModel = makeInnerOutline(edge, EDGE_WIDTH)
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
    borderOuter = makeInnerOutline(outerModel, outerBorderWidth)
    borderInner = makeInnerOutline(borderOuter, innerBorderWidth)
  }

  const { doesTextFit, text } = makeTextModel(
    textLines,
    font,
    validate,
    borderInner,
    outerModel,
    arcRadius,
  )

  let bolts = {} as makerjs.IModel

  if (inputs.mountingStyle === "wall mounted") {
    bolts = makeBoltsModel(
      outerModel,
      outerBorderWidth,
      innerBorderWidth,
      inputs,
    )
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
  const options = getSvgOptions({ ...props, doesTextFit })
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
