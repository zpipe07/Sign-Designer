import {
  FONT_MAP,
  SIZE_CONFIG_MAP,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Color,
  FontFamily,
  Size,
} from "@/src/components/SignDesigner/types"
import { generateModel } from "@/src/utils/makerjs"
import { NextRequest } from "next/server"
import opentype from "opentype.js"
import path from "path"
import { promises as fs } from "fs"
import { createClient } from "@/src/utils/supabase/server"
import { decode } from "base64-arraybuffer"

export async function POST(request: NextRequest) {
  // given the parameters of a sign, return the SVG
  const body = await request.json()
  const {
    fontFamily,
    textLines,
    shape,
    size,
    color,
    borderWidth,
    edgeStyle,
    mountingStyle,
    orderId,
    productId,
  } = body

  const dirRelativeToPublicFolder = "fonts"
  const dir = path.resolve("./public", dirRelativeToPublicFolder)
  const fontUrl = `${dir}/${FONT_MAP[fontFamily as FontFamily]}`
  const font = opentype.loadSync(`${fontUrl}`)
  const { height, width } = SIZE_CONFIG_MAP[size as Size]
  const [foregroundColor, backgroundColor] = color.split(
    "::",
  ) as Color[]
  const modelInputs = {
    height,
    width,
    outerBorderWidth: 0.3,
    innerBorderWidth: parseFloat(borderWidth),
    textLines,
    foregroundColor,
    backgroundColor,
    inputs: {
      borderWidth,
      color,
      edgeStyle,
      fontFamily,
      mountingStyle,
      shape,
      size,
      textLines,
    },
    font,
  }
  const { svg } = generateModel({
    ...modelInputs,
    strokeOnly: true,
    actualDimensions: true,
  })
  const filename = `${orderId}-${productId}-${color}.svg`
  await fs.writeFile(`/tmp/${filename}`, svg)
  const svgFile = await fs.readFile(`/tmp/${filename}`, {
    encoding: "base64",
  })
  const supabase = createClient()
  const { error } = await supabase.storage
    .from("signs")
    .upload(filename, decode(svgFile), {
      contentType: "image/svg+xml",
    })

  if (error) {
    throw error
  }

  return Response.json({ status: "ok" })
}
