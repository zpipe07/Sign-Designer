import { generateBreadModel } from "@/src/components/SVG/Bread"
import { generateEllipseModel } from "@/src/components/SVG/Ellipse"
import { SvgProps } from "@/src/components/SVG/types"

export function generateModel(
  props: SvgProps & { actualDimensions?: boolean },
) {
  if (props.inputs.shape === "ellipse") {
    return generateEllipseModel(props)
  }

  if (props.inputs.shape === "bread") {
    return generateBreadModel(props)
  }

  throw new Error("Invalid shape")
}
