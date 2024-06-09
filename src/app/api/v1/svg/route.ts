import path from "path"
import opentype from "opentype.js"
import { NextResponse, type NextRequest } from "next/server"

import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { getProduct } from "@/src/lib/bigcommerce"
import { FONT_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { FontFamily } from "@/src/components/SignDesigner/types"
import { generateModel } from "@/src/components/SVG/Ellipse"

export async function GET(request: NextRequest) {
  const product = await getProduct("112")

  if (!product) {
    throw new Error("Product not found")
  }

  const productOptionsMap = createProductOptionsMap(product)

  const searchParams = request.nextUrl.searchParams
  const shape = searchParams.get("shape")
  const orientation = searchParams.get("orientation")
  const size = searchParams.get("size")
  const textLines = searchParams.get("textLines")
  console.log({ shape, orientation, size })

  const fontFamily: FontFamily = "Arbutus"
  const dirRelativeToPublicFolder = "fonts"
  const dir = path.resolve("./public", dirRelativeToPublicFolder)
  const fontUrl = `${dir}/${FONT_MAP[fontFamily]}`
  const font = opentype.loadSync(`${fontUrl}`)
  // const ReactDOMServer = (await import("react-dom/server")).default
  // const component = React.createElement(SignDesignerVisualizerView, {
  //   inputs: {
  //     shape: "ellipse",
  //     orientation: "horizontal",
  //     size: "large",
  //     textLines: [
  //       { value: "654321" },
  //       { value: "Abcdefghijk" },
  //       { value: "Lmnopqrstuvwxyz" },
  //     ],
  //     // color: { foregroundColor: "black", backgroundColor: "green" },
  //     color: "black/white",
  //     fontFamily,
  //     // decoration: "",
  //   },
  //   font,
  //   productOptionsMap,
  //   strokeOnly: true,
  // })
  // const svg = ReactDOMServer.renderToString(component)
  // console.log({ svg })
  const { svg } = generateModel({
    height: 10,
    width: 15,
    borderWidth: 0.5,
    textLines: [
      { value: "654321" },
      { value: "Abcdefghijk" },
      { value: "Lmnopqrstuvwxyz" },
    ],
    foregroundColor: "black",
    backgroundColor: "white",
    inputs: {
      shape: "ellipse",
      orientation: "horizontal",
      size: "large",
      textLines: [
        { value: "654321" },
        { value: "Abcdefghijk" },
        { value: "Lmnopqrstuvwxyz" },
      ],
      // color: { foregroundColor: "black", backgroundColor: "green" },
      color: "black/white",
      fontFamily,
      // decoration: "",
    },
    font,
    // productOptionsMap,
    strokeOnly: true,
  })

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  })
}

export const dynamic = "force-dynamic"
