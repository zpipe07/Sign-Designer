export type Color = "black" | "white" | "tan" | "green" | "yellow"

export type ColorCombo = {
  foregroundColor: Color
  backgroundColor: Color
}

export type Decoration = "foo" | "bar"

export type FontFamily = "times" | "verdana"
// | "lucida Console"
// | "cursive"

export type Orientation = "horizontal" | "vertical"

export type Shape =
  | "rectangle"
  | "ellipse"
  | "topRound"
  | "sideRound"
  | "bread"

export type Size = "small" | "medium" | "large"

export type TextLine = { value: string }

export type DesignFormInputs = {
  shape: Shape
  orientation: Orientation
  size: Size
  textLines: TextLine[]
  color: ColorCombo
  fontFamily: FontFamily
  decoration: Decoration | ""
}
