export type Color =
  | "black"
  | "white"
  | "tan"
  | "green"
  | "yellow"
  | "#D6DAD2"

export type ColorCombo = `${Color}::${Color}`

export type Decoration = "foo" | "bar"

export type FontFamily =
  | "Arbutus"
  | "Danfo"
  | "AdventPro"
  | "JosefinSlab"
  | "DMSerif"
  | "Sancreek"
  | "Rye"
  | "SpicyRice"
  | "Ultra"
  | "Shrikhand"
  | "Limelight"
  | "Audiowide"
  | "TacOne"
  | "Train"
  | "MoiraiOne"
  | "AoboshiOne"
  | "BagelFatOne"

export type Orientation = "horizontal" | "vertical"

export type Shape =
  | "rectangle"
  | "ellipse"
  | "top round"
  // | "sideRound"
  | "bread"
  | "donnelly"

export type Size =
  | "extra small"
  | "extra small vertical"
  | "small"
  | "medium"
  | "large"
  | "extra large"

export type SizeConfig = {
  // [key in Orientation]: {
  width: number
  height: number
  maxLinesOfText: number
  // }
}

export type TextLine = {
  value: string
  fontSize: string
  offset: string
}

export type MountingStyle = "hanging" | "wall mounted"

export type EdgeStyle = "square" | "round"

export type DesignFormInputs = {
  shape: Shape
  size: Size
  color: ColorCombo
  textLines: TextLine[]
  fontFamily: FontFamily
  mountingStyle: MountingStyle
  edgeStyle: EdgeStyle
  borderWidth: string
  // orientation: Orientation
  // decoration: Decoration | ""
}
