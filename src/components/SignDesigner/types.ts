export type Color = "black" | "white" | "tan" | "green" | "yellow"

export type ColorCombo = `${Color}/${Color}`

export type Decoration = "foo" | "bar"

export type FontFamily =
  | "Albert"
  | "Expletus"
  | "Arbutus"
  | "Danfo"
  | "AdventPro"
  | "JosefinSlab"
  | "Tourney"
  | "DMSerif"
  | "Sancreek"
  | "Rye"
  | "SpicyRice"
  | "Ultra"
  | "Shrikhand"
  | "BreeSerif"
  | "Codystar"
  | "BungeeShade"
  | "Limelight"
  | "Monoton"
  | "Audiowide"
  | "PaytoneOne"
  | "TacOne"
  | "Cinzel"
  | "Train"
  | "VastShadow"
  | "Rampart"

export type Orientation = "horizontal" | "vertical"

export type Shape =
  | "rectangle"
  | "ellipse"
  | "top round"
  // | "sideRound"
  | "bread"

export type Size =
  | "extra small"
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

export type TextLine = { value: string; fontSize: number }

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
  borderWidth: number
  // orientation: Orientation
  // decoration: Decoration | ""
}
