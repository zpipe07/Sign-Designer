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
            strokeWidth: "1px",
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

export const formatSvg = (svg: string, showShadow: boolean) => {
  const dom = new JSDOM(svg)
  const svgElement = dom.window.document.querySelector(
    "svg",
  ) as SVGSVGElement

  dom.window.document.querySelectorAll("path").forEach((path) => {
    path.setAttribute("fill-rule", "evenodd")

    const id = path.getAttribute("id") as string
    const group = dom.window.document.createElement("g")

    path.parentNode?.insertBefore(group, path)
    group.appendChild(path)
    group.setAttribute("inkscape:groupmode", "layer")
    group.setAttribute("inkscape:label", id)
    group.setAttribute("id", id)
    path.removeAttribute("id")

    // if (showShadow) {
    //   const duplicatePath = path.cloneNode(true) as SVGPathElement

    //   duplicatePath.setAttribute("filter", "url(#filter)")
    //   group.appendChild(duplicatePath)
    // }
  })

  // if (showShadow) {
  //   const filter = dom.window.document.createElement("filter")

  //   filter.setAttribute("id", "filter")
  //   filter.innerHTML = `
  //       <!-- <feMorphology operator="dilate" radius="0" in="SourceAlpha" result="dark_edge_01" color-interpolation-filters="sRGB"></feMorphology> -->
  //       <feOffset dx="0.05" dy="0.05" in="SourceAlpha" result="dark_edge_03" color-interpolation-filters="sRGB"></feOffset>
  //       <feFlood flood-color="rgba(0,0,0,0.5)" result="dark_edge_04" color-interpolation-filters="sRGB"></feFlood>
  //       <feComposite in="dark_edge_04" in2="dark_edge_03" operator="in" result="dark_edge" color-interpolation-filters="sRGB"></feComposite>

  //       <!-- <feMorphology operator="dilate" radius="0" in="SourceAlpha" result="light_edge_01" color-interpolation-filters="sRGB"></feMorphology> -->
  //       <feOffset dx="-0.0125" dy="-0.0125" in="SourceAlpha" result="light_edge_03" color-interpolation-filters="sRGB"></feOffset>
  //       <feFlood flood-color="rgba(255,255,255,0.75)" result="light_edge_04" color-interpolation-filters="sRGB"></feFlood>
  //       <feComposite in="light_edge_04" in2="light_edge_03" operator="in" result="light_edge" color-interpolation-filters="sRGB"></feComposite>

  //       <feMerge result="edges" color-interpolation-filters="sRGB">
  //         <feMergeNode in="dark_edge"></feMergeNode>
  //         <feMergeNode in="light_edge"></feMergeNode>
  //       </feMerge>
  //       <feComposite in="edges" in2="SourceGraphic" operator="out" result="edges_complete" color-interpolation-filters="sRGB"></feComposite>

  //       <feGaussianBlur stdDeviation="0.05" result="bevel_blur" color-interpolation-filters="sRGB"></feGaussianBlur>
  //       <feSpecularLighting
  //         result="bevel_lighting"
  //         in="bevel_blur"
  //         specularConstant="100"
  //         specularExponent="100"
  //         lighting-color="rgba(60,60,60,0.25)"
  //         color-interpolation-filters="sRGB"
  //       >
  //         <feDistantLight azimuth="25" elevation="10"></feDistantLight>
  //       </feSpecularLighting>
  //       <feComposite in="bevel_lighting" in2="SourceGraphic" operator="in" result="bevel_complete" color-interpolation-filters="sRGB"></feComposite>

  //       <feMerge result="complete" color-interpolation-filters="sRGB">
  //         <feMergeNode in="edges_complete"></feMergeNode>
  //         <feMergeNode in="bevel_complete"></feMergeNode>
  //       </feMerge>
  //     `
  //   svgElement.appendChild(filter)
  // }

  const oldGroup = dom.window.document.getElementById("svgGroup")

  oldGroup?.replaceWith(...oldGroup.childNodes)

  return dom.window.document.body.innerHTML
}
