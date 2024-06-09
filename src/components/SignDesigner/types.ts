export type Color = "black" | "white" | "tan" | "green" | "yellow"

export type ColorCombo = `${Color}/${Color}`

export type Decoration = "foo" | "bar"

export type FontFamily =
  | "Albert"
  | "Expletus"
  | "Playfair"
  | "Cormorant"
  | "Arbutus"
// | "Tourney"
// "times"
// | "verdana"
// | "lucida Console"
// | "cursive"

export type Orientation = "horizontal" | "vertical"

export type Shape = "rectangle" | "ellipse" | "top round"
// | "sideRound"
// | "bread"

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

export type DesignFormInputs = {
  [key: string]: any
  // shape: Shape
  // orientation: Orientation
  // size: Size
  // textLines: TextLine[]
  // color: ColorCombo
  // fontFamily: FontFamily
  // decoration: Decoration | ""
}
