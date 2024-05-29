import makerjs from "makerjs"

import { FiligreeProps, SvgProps } from "@/src/components/SVG/types"
import { decorationIconMap } from "@/src/components/SignDesigner/SignDesignerForm"
import { Decoration } from "@/src/components/SignDesigner/types"

export const TopRound: React.FC<SvgProps> = ({
  height,
  width,
  borderWidth,
  inputs,
  textLines,
  foregroundColor,
  backgroundColor,
  font,
}) => {
  // const container = new makerjs.models.Rectangle(width, height)
  // const containerOffset = 5
  // // @ts-ignore
  // container.layer = "container"

  const outerRect = new makerjs.models.RoundRectangle(
    // width - containerOffset * 2,
    width,
    // height - containerOffset * 2,
    height / 2,
    100,
  )
  const outerOval = makerjs.model.move(
    // new makerjs.models.Oval(200, 200),
    new makerjs.models.Oval(width / 2, height / 2),
    // [100, 50],
    [width / 4, height / 6],
  )
  // @ts-ignore
  outerRect.layer = "outer"
  outerOval.layer = "outer"

  makerjs.model.combineUnion(outerRect, outerOval)

  const innerRect = makerjs.model.move(
    new makerjs.models.RoundRectangle(
      width - borderWidth * 2,
      height / 2 - borderWidth * 2,
      100,
    ),
    // [borderWidth - containerOffset, borderWidth - containerOffset],
    [borderWidth, borderWidth],
  )
  const innerOval = makerjs.model.move(
    makerjs.model.scale(
      new makerjs.models.Oval(width / 2, height / 2),
      0.9,
    ),
    [width / 4 + borderWidth, height / 6 + borderWidth],
  )
  innerRect.layer = "inner"
  innerOval.layer = "inner"

  makerjs.model.combineUnion(innerRect, innerOval)

  const textModels = {}

  for (const textLine of textLines) {
    const index = Object.keys(textModels).length
    const chars = textLine.value.length
    const fontSize = 300 - chars * 10
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
    const x = (width - measure.width) / 2
    const y =
      height / 2 -
      measure.height / 2 -
      250 * index +
      (textLines.length - 1) * 100 -
      250

    // @ts-ignore
    textModel.origin = [x, y]
    // @ts-ignore
    textModel.layer = "text"
    // @ts-ignore
    textModels[`textModel${index}`] = textModel
  }

  const topRound = {
    models: {
      // container,
      outerRect,
      outerOval,
      innerRect,
      innerOval,
      ...textModels,
    },
  }
  const svg = makerjs.exporter.toSVG(topRound, {
    layerOptions: {
      container: { stroke: "none" },
      inner: {
        fill: foregroundColor,
        stroke: foregroundColor,
      },
      outer: {
        fill: backgroundColor,
        // stroke: backgroundColor,
        stroke: "black",
      },
      text: {
        fill: backgroundColor,
        // stroke: "none",
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
    accuracy: 0.1,
  })

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
