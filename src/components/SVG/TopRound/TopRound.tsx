import makerjs, { IPathArc } from "makerjs"

import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm"
import { Decoration, Size } from "@/src/components/SignDesigner/types"

export function generateTopRoundModel({
  height,
  width,
  borderWidth,
  inputs,
  textLines,
  foregroundColor,
  backgroundColor,
  font,
  strokeOnly,
  actualDimensions,
}: SvgProps & { actualDimensions?: boolean }) {
  const outerRect = new makerjs.models.RoundRectangle(
    width,
    (height * 2) / 3,
    0.25,
  )
  const outerEllipse = new makerjs.models.Ellipse(
    width / 3,
    height / 2,
  )
  const measureOuterEllipse =
    makerjs.measure.modelExtents(outerEllipse)

  makerjs.model.move(outerEllipse, [
    width / 2,
    measureOuterEllipse.height / 2,
  ])

  const outer = makerjs.model.combineUnion(outerRect, outerEllipse)
  const chain = makerjs.model.findSingleChain(outer)
  const filletsModel = makerjs.chain.fillet(chain, 0.25)

  const outerModel = {
    models: {
      outer,
      filletsModel,
    },
  }
  makerjs.model.center(outerModel)

  const borderOuter = makerjs.model.outline(
    outerModel,
    0.5,
    undefined,
    true,
  )
  const borderInner = makerjs.model.outline(
    borderOuter,
    0.2,
    undefined,
    true,
  )

  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    const index = Object.keys(text.models).length
    const { value, fontSize } = textLine

    if (index === 0) {
      // house number
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )
      makerjs.model.center(textModel)

      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 1) {
      // street name
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )

      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, -2.75])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }

    if (index === 2) {
      // family name
      const textModel = new makerjs.models.Text(
        font,
        value,
        fontSize,
        true,
      )
      makerjs.model.center(textModel)
      makerjs.model.moveRelative(textModel, [0, 2.75])
      text.models[`textModel${index}`] = {
        ...textModel,
      }
      continue
    }
  }

  if (textLines.length > 0) {
    makerjs.model.center(text)
    makerjs.model.moveRelative(text, [0, -0.75])
  }

  const topRound = {
    models: {
      outer: { ...outerModel, layer: "outer" },
      borderOuter: { ...borderOuter, layer: "borderOuter" },
      borderInner: { ...borderInner, layer: "borderInner" },
      text: { ...text, layer: "text" },
    },
  }
  const strokeOnlyStyle = { fill: "none", stroke: "black" }
  const options: makerjs.exporter.ISVGRenderOptions = {
    layerOptions: {
      borderOuter: strokeOnly
        ? strokeOnlyStyle
        : {
            fill: backgroundColor,
            stroke: "none",
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
            stroke: backgroundColor,
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
    },
    units: makerjs.unitType.Inch,
  }
  const svg = makerjs.exporter.toSVG(topRound, options)

  return { svg }
}

export const TopRound: React.FC<SvgProps> = (props) => {
  const { svg } = generateTopRoundModel(props)

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  )
}
