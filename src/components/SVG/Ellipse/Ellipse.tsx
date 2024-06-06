import makerjs, { models, paths } from "makerjs"

import { SvgProps } from "@/src/components/SVG/types"
import { Size } from "@/src/components/SignDesigner/types"

const fontSizeMap: { [key in Size]: number } = {
  "extra small": 3,
  small: 3.5,
  medium: 4,
  large: 4.5,
  "extra large": 4.5,
}
const topArcYMap: { [key in Size]: number } = {
  "extra small": 0,
  small: 0,
  medium: 0,
  large: 0,
  "extra large": -20,
}

export const Ellipse: React.FC<SvgProps> = ({
  height,
  width,
  borderWidth,
  inputs,
  textLines,
  foregroundColor,
  backgroundColor,
  font,
}) => {
  const outer = new makerjs.models.Ellipse(width / 2, height / 2)
  const inner = makerjs.model.outline(
    outer,
    borderWidth,
    undefined,
    true,
  )
  const topArc = new makerjs.paths.Arc(
    [0, topArcYMap[inputs.size as Size]],
    width,
    75,
    105,
  )
  const bottomArc = new makerjs.paths.Arc(
    [0, -1 * topArcYMap[inputs.size as Size]],
    width,
    255,
    285,
  )
  const text: any = {
    models: {},
  }

  for (const textLine of textLines) {
    // if (inputs.orientation === "horizontal") {
    const index = Object.keys(text.models).length
    const chars = textLine.value.length
    const fontSize = fontSizeMap[inputs.size as Size] - chars * 0.25
    const textModel = new makerjs.models.Text(
      font,
      textLine.value,
      fontSize,
      true,
      false,
      0,
      {},
    )
    const measure = makerjs.measure.modelExtents(textModel)

    if (index === 0) {
      // house number
      const x = measure.width / -2
      const y = measure.height / -2

      text.models[`textModel${index}`] = {
        ...textModel,
        origin: [x, y],
      }
      continue
    }

    text.models[`textModel${index}`] = {
      ...textModel,
    }

    if (index === 1) {
      // street name

      makerjs.layout.childrenOnPath(
        textModel,
        bottomArc,
        0.5,
        false,
        false,
        true,
      )
      continue
    }

    if (index === 2) {
      // family name

      makerjs.layout.childrenOnPath(
        textModel,
        topArc,
        0.5,
        true,
        false,
        true,
      )
      continue
    }
    // } else if (inputs.orientation === "vertical") {
    //   textLine.value.split("").forEach((char, index) => {
    //     const chars = textLine.value.length
    //     const fontSize = 300 - chars * 10
    //     const textModel = new makerjs.models.Text(
    //       font,
    //       char,
    //       fontSize,
    //       true,
    //       false,
    //       0,
    //       {},
    //     )
    //     const measure = makerjs.measure.modelExtents(textModel)
    //     const x = measure?.width / -2
    //     const y =
    //       (chars - 1) * 125 - 250 * index - measure?.height / 2

    //     // @ts-ignore
    //     textModel.origin = [x, y]
    //     // @ts-ignore
    //     textModel.layer = "text"
    //     // @ts-ignore
    //     textModels[`textModel${index}`] = textModel
    //   })
    // }
  }

  const tabletFaceMount = {
    models: {
      outer: { ...outer, layer: "outer" },
      inner: { ...inner, layer: "inner" },
      text: { ...text, layer: "text" },

      // topArc: { ...topArc, layer: "topArc" },
    },
    paths: {
      topArc: { ...topArc, layer: "topArc" },
      bottomArc: { ...bottomArc, layer: "topArc" },
    },
  }

  const svg = makerjs.exporter.toSVG(tabletFaceMount, {
    layerOptions: {
      inner: {
        fill: foregroundColor,
        // fill: "transparent",
        stroke: foregroundColor,
        // stroke: "red",
      },
      outer: {
        fill: backgroundColor,
        // fill: "transparent",
      },
      text: {
        fill: backgroundColor,
        stroke: backgroundColor,
      },
      topArc: {
        stroke: "blue",
        // strokeWidth: 0.5,
      },
    },
    viewBox: true,
    svgAttrs: {
      xmlns: "http://www.w3.org/2000/svg",
      height: "100%",
      width: "100%",
      viewBox: `0 0 ${width} ${height}`,
    },
    fillRule: "nonzero",
    // accuracy: 0.25,
  })

  return (
    <div
      style={{ height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
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
  //       <ellipse
  //         cx={width / 2 - borderWidth / 2}
  //         cy={height / 2 - borderWidth / 2}
  //         rx={width / 2 - borderWidth / 2}
  //         ry={height / 2 - borderWidth / 2}
  //         fill={backgroundColor}
  //         stroke={foregroundColor}
  //         strokeWidth={borderWidth}
  //       />

  //       {inputs.orientation === "horizontal" &&
  //         textLines?.map(({ value }, index) => {
  //           const chars = value.length
  //           const fontSize = 95 - chars * 3.5
  //           const y = 70 * index + 170 - textLines.length * 30
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
  //           //     key={index}
  //           //   >
  //           //     {value}
  //           //   </text>
  //           // )
  //         })}

  //       {inputs.orientation === "vertical" &&
  //         textLines[0]?.value.split("").map((char, index) => {
  //           const chars = textLines[0]?.value.length
  //           const fontSize = 100 - chars * 8
  //           const x = 200 + index * 60 - chars * 25
  //           const y = 135

  //           const textModel = new makerjs.models.Text(
  //             font,
  //             char,
  //             fontSize,
  //             true,
  //             true,
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
  //               transform={`rotate(-90, ${x}, ${y}) translate(${x}, ${y})`}
  //               key={char}
  //             ></g>
  //           )
  //           // return (
  //           //   <text
  //           //     y={y}
  //           //     x={x}
  //           //     transform={`rotate(-90, ${x}, ${y})`}
  //           //     fontSize={fontSize}
  //           //     fontWeight={800}
  //           //     alignmentBaseline="middle"
  //           //     textAnchor="middle"
  //           //     fill={foregroundColor}
  //           //     fontFamily={inputs?.fontFamily}
  //           //     key={index}
  //           //   >
  //           //     {char}
  //           //   </text>
  //           // )
  //         })}

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
  //             x={75}
  //             y={40}
  //             color={foregroundColor}
  //           />

  //           <Decoration
  //             height={50}
  //             width={50}
  //             x={255}
  //             y={40}
  //             transform="scale(-1 1)"
  //             color={foregroundColor}
  //           />
  //         </>
  //       )}
  //     </g>
  //   </svg>
  // )
}
