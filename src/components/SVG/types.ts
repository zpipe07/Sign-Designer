import {
  Color,
  DesignFormInputs,
} from "@/src/components/SignDesigner/types"

export type SvgProps = {
  height: number
  width: number
  borderWidth: number
  inputs: DesignFormInputs
}

export type PreviewSvgProps = {
  height?: number
  width?: number
}

export type FiligreeProps = {
  height?: number
  width?: number
  x?: number
  y?: number
  transform?: string
  color?: Color
}
