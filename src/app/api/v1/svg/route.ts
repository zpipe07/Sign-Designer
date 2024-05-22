import React from "react"
import opentype from "opentype.js"
import { NextResponse, type NextRequest } from "next/server"

import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { getProduct } from "@/src/lib/bigcommerce"

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

  const font = opentype.loadSync(
    "public/fonts/AlbertSans-VariableFont_wght.ttf",
  )
  const ReactDOMServer = (await import("react-dom/server")).default
  const component = React.createElement(SignDesignerVisualizerView, {
    inputs: {
      shape: "rectangle",
      orientation: "horizontal",
      size: "medium",
      textLines: [{ value: "Hello world" }],
      // color: { foregroundColor: "black", backgroundColor: "green" },
      color: "black/green",
      fontFamily: "times",
      decoration: "",
    },
    font,
    productOptionsMap,
  })
  const svg = ReactDOMServer.renderToString(component)

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  })
}

export const dynamic = "force-dynamic"
