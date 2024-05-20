import React from "react"
import opentype from "opentype.js"
import { type NextRequest } from "next/server"

import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"
import { createProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { getBaseUrl } from "@/src/utils/vercel"

export async function GET(request: NextRequest) {
  console.log("getBaseUrl()", getBaseUrl())

  const res = await fetch(`${getBaseUrl()}/api/v1/products/112`)
  const data = await res.json()
  const productOptionsMap = createProductOptionsMap(data.product)

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
  const string = ReactDOMServer.renderToString(component)
  console.log({ string })

  return Response.json({})
}

export const dynamic = "force-dynamic"
