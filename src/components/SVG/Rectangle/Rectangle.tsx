///<reference path="../../../../node_modules/makerjs/dist/index.d.ts" />

import makerjs from "makerjs"
import memoize from "memoizee"

import { SvgProps } from "@/src/components/SVG/types"
import {
  BOLT_RADIUS,
  BOLT_OFFSET,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  EDGE_WIDTH,
  formatSvg,
  getSvgOptions,
  makeInnerOutline,
} from "@/src/utils/makerjs"
import {
  DesignFormInputs,
  TextLine,
} from "@/src/components/SignDesigner/types"

const TEXT_OFFSET = 3

const makeTextModel = memoize(
  (
    textLines: TextLine[],
    font: opentype.Font,
    validate: boolean | undefined,
    borderInner: makerjs.IModel | undefined,
    outer: makerjs.IModel,
    inputs: DesignFormInputs,
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
            makerjs.model.center(charModel)
            makerjs.model.moveRelative(charModel, [
              0,
              textMeasure.height * -i * 1.125,
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
              [0, parseFloat(offset)],
            )
          }

          continue
        } else {
          makerjs.model.center(textModel)
        }
      }

      if (index === 1) {
        // upper
        makerjs.model.center(textModel)
        makerjs.model.moveRelative(textModel, [0, TEXT_OFFSET])
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

const makeBoltsModel = memoize(
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
        BOLT_OFFSET,
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

export function generateRectangleModel(props: SvgProps) {
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
  let edge
  let outer

  if (inputs.edgeStyle === "round") {
    edge = new makerjs.models.RoundRectangle(width, height, 0.25)
    makerjs.model.center(edge)

    outer = makeInnerOutline(edge, EDGE_WIDTH)
  } else {
    outer = new makerjs.models.RoundRectangle(width, height, 0.25)
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
    validate,
    borderInner,
    outer,
    inputs,
  )

  let bolts = {} as makerjs.IModel

  if (inputs.mountingStyle === "wall mounted") {
    bolts = makeBoltsModel(outer, outerBorderWidth, innerBorderWidth)
  }

  const rectangleModel = {
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
  const svg = makerjs.exporter.toSVG(rectangleModel, options)
  const formattedSvg = formatSvg(svg)

  return { svg: formattedSvg }
}

export const Rectangle: React.FC<SvgProps> = (props) => {
  const { svg } = generateRectangleModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
