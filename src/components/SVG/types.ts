import opentype from "opentype.js"

import {
  Color,
  DesignFormInputs,
  TextLine,
} from "@/src/components/SignDesigner/types"

export type SvgProps = {
  height: number
  width: number
  borderWidth: number
  inputs: DesignFormInputs
  textLines: TextLine[]
  foregroundColor: Color
  backgroundColor: Color
  font: opentype.Font
  strokeOnly?: boolean
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
