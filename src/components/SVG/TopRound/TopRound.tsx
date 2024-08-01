import makerjs from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { calculateAngle } from "@/src/components/SVG/Ellipse"
import {
  BOLT_OFFSET,
  BOLT_RADIUS,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { getSvgOptions } from "@/src/utils/makerjs"

const TEXT_OFFSET = 3.0

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

      makerjs.layout.childrenOnChain(textModel, chain, 0, false, true)
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

    text.models[`textModel${index}`] = {
      ...textModel,
    }
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
