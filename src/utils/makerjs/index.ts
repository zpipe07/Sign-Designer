import makerjs from "makerjs"
import memoize from "memoizee"
import jsdom from "jsdom"

import { generateBreadModel } from "@/src/components/SVG/Bread"
import { generateDonnellyModel } from "@/src/components/SVG/Donnelly"
import { generateEllipseModel } from "@/src/components/SVG/Ellipse"
import { generateRectangleModel } from "@/src/components/SVG/Rectangle"
import { generateTopRoundModel } from "@/src/components/SVG/TopRound"
import { SvgProps } from "@/src/components/SVG/types"

export const EDGE_WIDTH = 0.2

export const generateModel = memoize((props: SvgProps) => {
  if (props.inputs.shape === "ellipse") {
    return generateEllipseModel(props)
  }

  if (props.inputs.shape === "bread") {
    return generateBreadModel(props)
  }

  if (props.inputs.shape === "rectangle") {
    return generateRectangleModel(props)
  }

  if (props.inputs.shape === "top round") {
    return generateTopRoundModel(props)
  }

  if (props.inputs.shape === "donnelly") {
    return generateDonnellyModel(props)
  }

  throw new Error("Invalid shape")
})

export const makeInnerOutline = memoize(
  (model: makerjs.IModel, outlineWidth: number) => {
    return makerjs.model.outline(model, outlineWidth, undefined, true)
  },
)

export const getSvgOptions = ({
  strokeOnly,
  backgroundColor,
  foregroundColor,
  actualDimensions,
  height,
  width,
  validate,
  showShadow,
  doesTextFit,
}: SvgProps & {
  doesTextFit: boolean
}): makerjs.exporter.ISVGRenderOptions => {
  const strokeOnlyStyle = { fill: "none", stroke: "black" }

  return {
    layerOptions: {
      edge: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
          },
      borderOuter: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
          },
      borderInner: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
            stroke: "none",
          },
      outer: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: foregroundColor,
            stroke: "none",
          },
      text: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "rgba(0, 0, 0, 0.25)",
            strokeWidth: "2px",
          },
      bolts: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: "white",
            stroke: "none",
          },
    },
    viewBox: true,
    svgAttrs: {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:inkscape": "http://www.inkscape.org/namespaces/inkscape",
      id: "svg2",
      version: "1.1",
      height: actualDimensions ? `${height}in` : "100%",
      width: actualDimensions ? `${width}in` : "100%",
      viewBox: `0 0 ${width} ${height}`,
      ...(validate && { "data-does-text-fit": doesTextFit }),
      ...(showShadow && {
        filter: "drop-shadow( 0px 0px 2px rgba(0, 0, 0, 0.5))",
      }),
    },
    units: makerjs.unitType.Inch,
    fillRule: "evenodd",
  }
}

const { JSDOM } = jsdom

export const formatSvg = (svg: string) => {
  const dom = new JSDOM(svg)

  dom.window.document.querySelectorAll("path").forEach((path) => {
    path.setAttribute("fill-rule", "evenodd")
    const id = path.getAttribute("id")

    if (id) {
      const group = dom.window.document.createElement("g")

      path.parentNode?.insertBefore(group, path)
      group.appendChild(path)
      group.setAttribute("inkscape:groupmode", "layer")
      group.setAttribute("inkscape:label", id)
      group.setAttribute("id", id)
    }
  })

  const oldGroup = dom.window.document.getElementById("svgGroup")

  oldGroup?.replaceWith(...oldGroup.childNodes)

  return dom.window.document.body.innerHTML
}
