///<reference path="../../../../node_modules/makerjs/dist/index.d.ts" />

import makerjs from "makerjs"

import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm"
import {
  Decoration,
  TextLine,
} from "@/src/components/SignDesigner/types"

const defaultColor = "#D9D9D9"

export const Rectangle: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
  borderWidth = 0,
  inputs,
  textLines,
  foregroundColor,
  backgroundColor,
  font,
}) => {
  const outer = new makerjs.models.RoundRectangle(400, 280, 8)
  // @ts-ignore
  outer.layer = "outer"

  const inner = new makerjs.models.RoundRectangle(360, 240, 8)
  inner.origin = [20, 20]
  // @ts-ignore
  inner.layer = "inner"

  // const textModels = textLines.map(
  //   ({ value }: TextLine, index: number) => {
  //     const chars = value.length
  //     const fontSize = 95 - chars * 3.5
  //     const y = 70 * index + 145 - textLines.length * 30
  //     const textModel = new makerjs.models.Text(
  //       font,
  //       value,
  //       fontSize,
  //       false,
  //       false,
  //       0,
  //       {},
  //     )
  //     textModel.origin = [(width - borderWidth) / chars, y]
  //     textModel.layer = "text"

  //     return { [`textModel${index}`]: textModel }
  //   },
  // )
  const textModels = {}

  for (const textLine of textLines) {
    const index = Object.keys(textModels).length
    const chars = textLine.value.length
    const fontSize = 95 - chars * 3.5
    const x = 250 / chars + 30
    const y = textLines.length * 30 - 70 * index + 100
    const textModel = new makerjs.models.Text(
      font,
      textLine.value,
      fontSize,
      false,
      false,
      0,
      {},
    )

    // @ts-ignore
    textModel.origin = [x, y]
    // @ts-ignore
    textModel.layer = "text"
    // @ts-ignore
    textModels[`textModel${index}`] = textModel
  }

  const tabletFaceMount = {
    models: {
      outer: outer,
      inner: inner,
      ...textModels,
    },
  }

  const svg = makerjs.exporter.toSVG(tabletFaceMount, {
    layerOptions: {
      inner: {
        fill: foregroundColor,
        stroke: foregroundColor,
      },
      outer: {
        fill: backgroundColor,
        // stroke: backgroundColor,
      },
      text: {
        fill: backgroundColor,
        // stroke: "none",
      },
    },
    // accuracy: -1,
    accuracy: 0.01,
  })

  return <div dangerouslySetInnerHTML={{ __html: svg }}></div>
  // const Decoration: React.FC<FiligreeProps> | null =
  //   inputs?.decoration
  //     ? decorationIconMap[inputs.decoration as Decoration]
  //     : null

  // return (
  //   <svg
  //     viewBox={`0 0 ${width} ${height}`}
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     transform={
  //       inputs.orientation === "vertical"
  //         ? `rotate(90) translate(75 0)`
  //         : ""
  //     }
  //   >
  //     <g
  //       transform={`translate(${borderWidth / 2},${borderWidth / 2})`}
  //     >
  //       <rect
  //         width={width - borderWidth}
  //         height={height - borderWidth}
  //         rx="10"
  //         fill={backgroundColor || defaultColor}
  //         stroke={foregroundColor}
  //         strokeWidth={borderWidth}
  //       />

  //       {inputs.orientation === "horizontal" &&
  //         textLines?.map(({ value }: TextLine, index: number) => {
  //           const chars = value.length
  //           const fontSize = 95 - chars * 3.5
  //           const y = 70 * index + 145 - textLines.length * 30
  //           const textModel = new makerjs.models.Text(
  //             font,
  //             value,
  //             fontSize,
  //             false,
  //             false,
  //             0,
  //             {},
  //           )
  //           const svg = makerjs.exporter.toSVG(textModel, {
  //             fill: foregroundColor,
  //             stroke: "none",
  //           })

  //           return (
  //             <g
  //               dangerouslySetInnerHTML={{ __html: svg }}
  //               transform={`translate(${(width - borderWidth) / chars}, ${y})`}
  //               key={value}
  //             ></g>
  //           )

  //           // return (
  //           //   <text
  //           //     y={y}
  //           //     x={(width - borderWidth) / 2}
  //           //     fontSize={fontSize}
  //           //     fontWeight={800}
  //           //     alignmentBaseline="middle"
  //           //     textAnchor="middle"
  //           //     fill={foregroundColor}
  //           //     fontFamily={inputs?.fontFamily}
  //           //     letterSpacing={1}
  //           //     key={index}
  //           //   >
  //           //     {value}
  //           //   </text>
  //           // )
  //         })}

  //       {inputs.orientation === "vertical" &&
  //         textLines[0]?.value
  //           .split("")
  //           .map((char: string, index: number) => {
  //             const chars = textLines[0]?.value.length
  //             const fontSize = 100 - chars * 8
  //             // const x = 200 + index * 70 - chars * 28
  //             // const y = 110
  //             const x = 70 * index + 130 - chars * 20
  //             const y = 130
  //             const textModel = new makerjs.models.Text(
  //               font,
  //               char,
  //               fontSize,
  //               true,
  //               true,
  //               0,
  //               {},
  //             )
  //             const svg = makerjs.exporter.toSVG(textModel, {
  //               fill: foregroundColor,
  //               stroke: "none",
  //             })

  //             return (
  //               <g
  //                 dangerouslySetInnerHTML={{ __html: svg }}
  //                 transform={`rotate(-90, ${x}, ${y}) translate(${x}, ${y})`}
  //                 key={char}
  //               ></g>
  //             )
  //             // return (
  //             //   <text
  //             //     y={y}
  //             //     x={x}
  //             //     transform={`rotate(-90, ${x}, ${y})`}
  //             //     fontSize={fontSize}
  //             //     fontWeight={800}
  //             //     alignmentBaseline="middle"
  //             //     textAnchor="middle"
  //             //     fill={foregroundColor}
  //             //     fontFamily={inputs?.fontFamily}
  //             //     key={index}
  //             //   >
  //             //     {char}
  //             //   </text>
  //             // )
  //           })}

  //       {/* {streetNumber && (
  //         <text
  //           y={height / 2 - 30}
  //           x={(width - borderWidth) / 2}
  //           fontSize={50}
  //           fontWeight={800}
  //           alignmentBaseline="middle"
  //           textAnchor="middle"
  //           fill={foregroundColor}
  //           fontFamily={fontFamily}
  //         >
  //           {streetNumber}
  //         </text>
  //       )} */}

  //       {/* {streetName && (
  //         <text
  //           y={height / 2 + 20}
  //           x={(width - borderWidth) / 2}
  //           fontSize={40}
  //           fontWeight={600}
  //           alignmentBaseline="middle"
  //           textAnchor="middle"
  //           fill={foregroundColor}
  //           fontFamily={fontFamily}
  //         >
  //           {streetName}
  //         </text>
  //       )} */}

  //       {Decoration && (
  //         <>
  //           <Decoration
  //             height={50}
  //             width={50}
  //             x={30}
  //             y={30}
  //             color={foregroundColor}
  //           />

  //           <Decoration
  //             height={50}
  //             width={50}
  //             x={300}
  //             y={30}
  //             transform="scale(-1 1)"
  //             color={foregroundColor}
  //           />
  //         </>
  //       )}
  //     </g>
  //   </svg>
  // )
}
