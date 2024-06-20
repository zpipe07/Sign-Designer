import { generateBreadModel } from "@/src/components/SVG/Bread"
import { generateEllipseModel } from "@/src/components/SVG/Ellipse"
import { generateRectangleModel } from "@/src/components/SVG/Rectangle"
import { generateTopRoundModel } from "@/src/components/SVG/TopRound"
import { SvgProps } from "@/src/components/SVG/types"

export function generateModel(
  props: SvgProps & {
    actualDimensions?: boolean
    showShadow?: boolean
  },
) {
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

  throw new Error("Invalid shape")
}
