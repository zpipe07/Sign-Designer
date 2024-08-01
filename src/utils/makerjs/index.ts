import makerjs from "makerjs"
import memoize from "memoizee"

import { generateBreadModel } from "@/src/components/SVG/Bread"
import { generateDonnellyModel } from "@/src/components/SVG/Donnelly"
import { generateEllipseModel } from "@/src/components/SVG/Ellipse"
import { generateRectangleModel } from "@/src/components/SVG/Rectangle"
import { generateTopRoundModel } from "@/src/components/SVG/TopRound"
import { SvgProps } from "@/src/components/SVG/types"

export const EDGE_WIDTH = 0.2

export const generateModel = memoize((props: SvgProps) => {
  if (props.inputs.shape === "ellipse") {
    return generateEllipseModel(props)
  }

  if (props.inputs.shape === "bread") {
    return generateBreadModel(props)
  }

  if (props.inputs.shape === "rectangle") {
    return generateRectangleModel(props)
  }

  if (props.inputs.shape === "top round") {
    return generateTopRoundModel(props)
  }

  if (props.inputs.shape === "donnelly") {
    return generateDonnellyModel(props)
  }

  throw new Error("Invalid shape")
})

export const makeInnerOutline = memoize(
  (model: makerjs.IModel, outlineWidth: number) => {
    return makerjs.model.outline(model, outlineWidth, undefined, true)
  },
)
