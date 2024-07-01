import path from "path"
import opentype from "opentype.js"
import { NextResponse, type NextRequest } from "next/server"

import {
  FONT_MAP,
  SIZE_CONFIG_MAP,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Color } from "@/src/components/SignDesigner/types"
import { generateModel } from "@/src/utils/makerjs"
import { parseSearchParams } from "@/src/utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const {
    shape,
    size,
    textLines,
    color,
    fontFamily,
    mountingStyle,
    edgeStyle,
    showShadow,
    borderWidth,
  } = parseSearchParams(searchParams)

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
    outerBorderWidth: 0.3,
    innerBorderWidth: borderWidth,
    textLines,
    foregroundColor,
    backgroundColor,
    inputs: {
      shape,
      size,
      textLines,
      color,
      fontFamily,
      mountingStyle,
      edgeStyle,
      borderWidth,
    },
    font,
    showShadow,
    // productOptionsMap,
    // strokeOnly: true,
  })

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  })
}

export const dynamic = "force-dynamic"
