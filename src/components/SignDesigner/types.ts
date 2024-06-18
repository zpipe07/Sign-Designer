export type Color = "black" | "white" | "tan" | "green" | "yellow"

export type ColorCombo = `${Color}/${Color}`

export type Decoration = "foo" | "bar"

export type FontFamily =
  | "Albert"
  | "Expletus"
  // | "Playfair"
  // | "Cormorant"
  | "Arbutus"
  | "Comfortaa"
  | "Danfo"
  | "Sansita"
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
  | "Cinzel"

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

export type TextLine = { value: string }

export type MountingStyle = "hanging" | "wall mounted"

export type DesignFormInputs = {
  // [key: string]: any
  shape: Shape
  size: Size
  color: ColorCombo
  textLines: TextLine[]
  fontFamily: FontFamily
  mountingStyle: MountingStyle
  // orientation: Orientation
  // decoration: Decoration | ""
}
