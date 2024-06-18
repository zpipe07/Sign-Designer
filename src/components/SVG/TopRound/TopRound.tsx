import makerjs, { IPathArc } from "makerjs"

import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm"
import { Decoration, Size } from "@/src/components/SignDesigner/types"

const fontSizeMap: { [key in Size]: number } = {
  "extra small": 2.5,
  small: 4.5,
  medium: 3.5,
  large: 3.6,
  "extra large": 4.0,
}

const textOffsetMap: { [key in Size]: number } = {
  "extra small": 0,
  small: -1,
  medium: 0.5,
  large: -0.5,
  "extra large": 0,
}

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
    const chars = textLine.value.length

    if (index === 0) {
      // house number
      const fontSize = fontSizeMap[inputs.size] - chars * 0.2
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
        false,
        false,
      )
      makerjs.model.center(textModel)
      const measure = makerjs.measure.modelExtents(textModel)
      const x = width / 2 - measure.width / 2
      const y =
        height / 2 - measure.height / 2 + textOffsetMap[inputs.size]

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 1) {
      // street name
      const fontSize = fontSizeMap[inputs.size] - chars * 0.125
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = width / 2 - measure.width / 2
      const y = 2

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    if (index === 2) {
      // family name
      const fontSize = fontSizeMap[inputs.size] - chars * 0.125 - 1
      const textModel = new makerjs.models.Text(
        font,
        textLine.value,
        fontSize,
      )
      const measure = makerjs.measure.modelExtents(textModel)
      const x = width / 2 - measure.width / 2
      const y = height - 4

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }
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
      // arc: {
      //   stroke: "blue",
      // },
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
      // height: `${height}in`,
      // width: `${width}in`,
      viewBox: `0 0 ${width} ${height}`,
    },
    // fillRule: "nonzero",
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
  // const Decoration: React.FC<FiligreeProps> | null =
  //   inputs?.decoration
  //     ? decorationIconMap[inputs.decoration as Decoration]
  //     : null

  // return (
  //   <svg
  //     // viewBox={`0 0 ${width} ${height}`}
  //     viewBox="0 0 400 315"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d={`
  //         m90.3147
  //         75h5.9221l2.8468-5.1931c19.5504-35.6637
  //         57.4214-59.8069
  //         100.9164-59.8069
  //         43.495
  //         0
  //         81.366
  //         24.1432
  //         100.916
  //         59.8069l2.847
  //         5.1931h5.922
  //         70.315c5.523
  //         0
  //         10
  //         4.4771
  //         10
  //         10v${height - 105}c0
  //         5.523-4.477
  //         10-10
  //         10h-360c-5.5228
  //         0-10-4.477-10-10v-${height - 105}c0-5.5229
  //         4.4772-10
  //         10-10h70.3147z
  //       `}
  //       fill={backgroundColor}
  //       stroke={foregroundColor}
  //       strokeWidth={borderWidth}
  //     />

  //     {textLines?.map(({ value }, index) => {
  //       const chars = value.length
  //       const fontSize = 100 - chars * 4
  //       const y = 50 * index + 190 - textLines.length * 40

  //       return (
  //         <text
  //           y={y}
  //           x={width / 2}
  //           fontSize={fontSize}
  //           fontWeight={800}
  //           alignmentBaseline="middle"
  //           textAnchor="middle"
  //           fill={foregroundColor}
  //           fontFamily={inputs?.fontFamily}
  //           letterSpacing={1}
  //           key={index}
  //         >
  //           {value}
  //         </text>
  //       )
  //     })}

  //     {/* {streetNumber && (
  //       <text
  //         y={height / 2 - 20}
  //         x={width / 2}
  //         fontSize={50}
  //         fontWeight={800}
  //         alignmentBaseline="middle"
  //         textAnchor="middle"
  //         fill={foregroundColor}
  //         fontFamily={fontFamily}
  //       >
  //         {streetNumber}
  //       </text>
  //     )} */}

  //     {/* {streetName && (
  //       <text
  //         y={height / 2 + 30}
  //         x={width / 2}
  //         fontSize={40}
  //         fontWeight={600}
  //         alignmentBaseline="middle"
  //         textAnchor="middle"
  //         fill={foregroundColor}
  //         fontFamily={fontFamily}
  //       >
  //         {streetName}
  //       </text>
  //     )} */}

  //     {Decoration && (
  //       <>
  //         <Decoration
  //           height={50}
  //           width={50}
  //           x={30}
  //           y={105}
  //           color={foregroundColor}
  //         />

  //         <Decoration
  //           height={50}
  //           width={50}
  //           x={320}
  //           y={105}
  //           transform="scale(-1 1)"
  //           color={foregroundColor}
  //         />
  //       </>
  //     )}
  //   </svg>
  // )
}
