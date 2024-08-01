import makerjs from "makerjs"
import memoizee from "memoizee"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  EDGE_WIDTH,
  getSvgOptions,
  makeInnerOutline,
} from "@/src/utils/makerjs"
import {
  DesignFormInputs,
  TextLine,
} from "@/src/components/SignDesigner/types"

const TEXT_OFFSET = 3

const makeTextModel = memoizee(
  (
    textLines: TextLine[],
    font: opentype.Font,
    validate: boolean | undefined,
    borderInner: makerjs.IModel | undefined,
    outer: makerjs.IModel,
    inputs: DesignFormInputs,
  ) => {
    let doesTextFit = true
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
        if (inputs.size === "extra small vertical") {
          const textMeasure = makerjs.measure.modelExtents(textModel)
          text.models[`textModel${index}`] = {
            models: {},
          }

          value.split("").forEach((char, i) => {
            if (char === " ") {
              return
            }

            const charModel = new makerjs.models.Text(
              font,
              char,
              parseFloat(fontSize),
            )

            makerjs.model.rotate(charModel, -90)
            makerjs.model.center(charModel)
            makerjs.model.moveRelative(charModel, [
              textMeasure.height * -i * 1.125,
              0,
            ])

            text.models[`textModel${index}`].models[`charModel${i}`] =
              {
                ...charModel,
              }
          })

          makerjs.model.center(text.models[`textModel${index}`])

          if (parseFloat(offset)) {
            makerjs.model.moveRelative(
              text.models[`textModel${index}`],
              [parseFloat(offset), 0],
            )
          }

          continue
        } else {
          makerjs.model.center(textModel)
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
      }

      if (index === 1) {
        // upper
        makerjs.model.center(textModel)
        makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])

        if (validate) {
          const textMeasure = makerjs.measure.modelExtents(textModel)
          const innerMeasure = borderInner
            ? makerjs.measure.modelExtents(borderInner)
            : makerjs.measure.modelExtents(outer)

          if (innerMeasure.width - 1.125 <= textMeasure.width) {
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

          if (innerMeasure.width - 1.125 <= textMeasure.width) {
            doesTextFit = false
          }
        }
      }

      if (parseFloat(offset)) {
        makerjs.model.moveRelative(textModel, [0, parseFloat(offset)])
      }

      text.models[`textModel${index}`] = {
        ...textModel,
      }
    }

    return { doesTextFit, text }
  },
)

const makeBoltsModel = memoizee(
  (outer, outerBorderWidth, innerBorderWidth, leftEllipseMeasure) => {
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

export function generateDonnellyModel(props: SvgProps) {
  const {
    // height,
    // width,
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

  if (inputs.size === "extra small vertical") {
    const temp = props.height
    props.height = props.width
    props.width = temp
  }

  const leftEllipse = new makerjs.models.Ellipse(
    props.height / 3,
    props.height / 2,
  )
  const leftEllipseMeasure = makerjs.measure.modelExtents(leftEllipse)

  makerjs.model.center(leftEllipse)
  makerjs.model.move(leftEllipse, [
    props.width / -2 + leftEllipseMeasure.width / 2,
    0,
  ])

  const rightEllipse = makerjs.model.mirror(leftEllipse, true, false)
  const outerRect = new makerjs.models.RoundRectangle(
    props.width - leftEllipseMeasure.width / 3,
    props.height,
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

    outer = makeInnerOutline(edge, EDGE_WIDTH)
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
    borderOuter = makeInnerOutline(outer, outerBorderWidth)
    borderInner = makeInnerOutline(borderOuter, innerBorderWidth)
  }

  const { doesTextFit, text } = makeTextModel(
    textLines,
    font,
    validate,
    borderInner,
    outer,
    inputs,
  )

  let bolts = {} as makerjs.IModel

  if (inputs.mountingStyle === "wall mounted") {
    bolts = makeBoltsModel(
      outer,
      outerBorderWidth,
      innerBorderWidth,
      leftEllipseMeasure,
    )
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

  if (inputs.size === "extra small vertical") {
    makerjs.model.rotate(topRound, 90)

    const temp = props.height
    props.height = props.width
    props.width = temp
  }

  const options = getSvgOptions({ ...props, doesTextFit })
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
