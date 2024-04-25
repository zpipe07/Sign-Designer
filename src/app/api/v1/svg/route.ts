import React from "react"
import { type NextRequest } from "next/server"

import { SignDesignerVisualizerView } from "@/src/components/SignDesignerVisualizer"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const shape = searchParams.get("shape")
  const orientation = searchParams.get("orientation")
  const size = searchParams.get("size")
  const textLines = searchParams.get("textLines")
  console.log({ shape, orientation, size })

  const ReactDOMServer = (await import("react-dom/server")).default
  const component = React.createElement(SignDesignerVisualizerView, {
    inputs: {
      shape: "bread",
      orientation: "horizontal",
      size: "medium",
      textLines: [],
      color: { foregroundColor: "black", backgroundColor: "green" },
      fontFamily: "times",
      decoration: "bar",
    },
  })
  const string = ReactDOMServer.renderToString(component)

  return Response.json({ string })
}
