import path from "path"
import opentype from "opentype.js"
import { NextResponse, type NextRequest } from "next/server"

import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { getProduct } from "@/src/lib/bigcommerce"
import {
  FONT_MAP,
  SIZE_CONFIG_MAP,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Color,
  ColorCombo,
  FontFamily,
  Shape,
  Size,
} from "@/src/components/SignDesigner/types"
import { generateModel } from "@/src/utils/makerjs"

export async function GET(request: NextRequest) {
  const product = await getProduct("112")

  if (!product) {
    throw new Error("Product not found")
  }

  const productOptionsMap = createProductOptionsMap(product)

  const searchParams = request.nextUrl.searchParams
  const shape = searchParams.get("shape") as Shape
  const size = searchParams.get("size") as Size
  const textLines = searchParams.get("textLines")
  const color = searchParams.get("color") as ColorCombo

  if (!shape) {
    return new NextResponse(
      "Missing required query parameter: shape",
      { status: 400 },
    )
  }

  if (!size) {
    return new NextResponse(
      "Missing required query parameter: size",
      { status: 400 },
    )
  }

  if (!color) {
    return new NextResponse(
      "Missing required query parameter: color",
      { status: 400 },
    )
  }

  let parsedTextLines = []
  if (textLines) {
    parsedTextLines = JSON.parse(textLines)
      .filter(Boolean)
      .map((text: string) => ({
        value: text,
      }))
  }

  const fontFamily: FontFamily = "Albert"
  const dirRelativeToPublicFolder = "fonts"
  const dir = path.resolve("./public", dirRelativeToPublicFolder)
  const fontUrl = `${dir}/${FONT_MAP[fontFamily]}`
  const font = opentype.loadSync(`${fontUrl}`)
  const { height, width } = SIZE_CONFIG_MAP[size]
  const [foregroundColor, backgroundColor] = color.split("/") as [
    Color,
    Color,
  ]

  const { svg } = generateModel({
    height,
    width,
    borderWidth: 0.5,
    textLines: parsedTextLines,
    foregroundColor,
    backgroundColor,
    inputs: {
      shape,
      size,
      textLines: parsedTextLines,
      color,
      fontFamily,
      mountingStyle: "wall mounted",
    },
    font,
    // productOptionsMap,
    // strokeOnly: true,
  })

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  })
}

export const dynamic = "force-dynamic"
