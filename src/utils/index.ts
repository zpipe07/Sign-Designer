import {
  ColorCombo,
  DesignFormInputs,
  EdgeStyle,
  FontFamily,
  MountingStyle,
  Shape,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"

export function parseSearchParams(
  searchParams: URLSearchParams,
): DesignFormInputs & { showShadow?: boolean; validate?: boolean } {
  const shape = searchParams.get("shape") as Shape
  const size = searchParams.get("size") as Size
  const textLines = searchParams.get("textLines")
  const color = searchParams.get("color") as ColorCombo
  const mountingStyle = searchParams.get(
    "mountingStyle",
  ) as MountingStyle
  const fontFamily = searchParams.get("fontFamily") as FontFamily
  const edgeStyle = searchParams.get("edgeStyle") as EdgeStyle
  const showShadow = searchParams.get("showShadow") === "true"
  const borderWidth = searchParams.get("borderWidth")
  const validate = searchParams.get("validate") === "true"

  let parsedTextLines = []
  if (textLines) {
    parsedTextLines = JSON.parse(textLines)
    // .filter(Boolean)
    // .map((text: string) => ({
    //   value: text,
    // }))
  }

  return {
    shape,
    size,
    textLines: parsedTextLines,
    color,
    fontFamily,
    mountingStyle,
    edgeStyle,
    showShadow,
    borderWidth: borderWidth || "",
    validate,
  }
}

export const getFilename = (
  orderId: number,
  productId: number,
  color: string,
  textLines: TextLine[],
) => {
  const text = textLines
    .filter(({ value }) => !!value)
    .map(({ value }) => value)
    .join("-")
    .replace(/\s/g, "")

  return `${orderId}_${productId}_${color}_${text}.svg`
}
