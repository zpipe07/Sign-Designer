import opentype from "opentype.js"

import {
  Color,
  DesignFormInputs,
  Orientation,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"
import { ProductOptionsMap } from "@/src/hooks/queries/useGetProduct"
import { Rectangle } from "@/src/components/SVG/Rectangle"
import { Ellipse } from "@/src/components/SVG/Ellipse"
import { TopRound } from "@/src/components/SVG/TopRound"
import { SideRound } from "@/src/components/SVG/SideRound"
import { Bread } from "@/src/components/SVG/Bread"
import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"

type Props = {
  inputs: DesignFormInputs
  font: opentype.Font
  productOptionsMap: ProductOptionsMap
  strokeOnly?: boolean
}

export const SignDesignerVisualizerView: React.FC<Props> = ({
  inputs,
  font,
  // productOptionsMap,
  strokeOnly,
}) => {
  const borderWidth = 0.5
  const maxLinesOfText =
    SIZE_CONFIG_MAP[inputs.size as Size].maxLinesOfText
  // SIZE_CONFIG_MAP[inputs.size as Size][
  //   inputs.orientation as Orientation
  // ].maxLinesOfText
  const textLines: TextLine[] = inputs?.textLines
    ?.slice(0, maxLinesOfText)
    .filter(({ value }: TextLine) => {
      return !!value
    })
  const [foregroundColor, backgroundColor] =
    (inputs?.color?.split("::") as Color[]) || []
  const { width, height } = SIZE_CONFIG_MAP[inputs.size as Size]
  // SIZE_CONFIG_MAP[inputs.size as Size][
  //   inputs.orientation as Orientation
  // ]

  return (
    <>
      {inputs.shape === "rectangle" && (
        <Rectangle
          width={width}
          height={height}
          outerBorderWidth={borderWidth}
          innerBorderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}

      {inputs.shape === "ellipse" && (
        <Ellipse
          width={width}
          height={height}
          outerBorderWidth={borderWidth}
          innerBorderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
          strokeOnly={strokeOnly}
          // strokeOnly
        />
      )}

      {inputs.shape === "top round" && (
        <TopRound
          width={width}
          height={height}
          outerBorderWidth={borderWidth}
          innerBorderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}

      {/* {inputs.shape === "sideRound" && (
        <SideRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )} */}

      {inputs.shape === "bread" && (
        <Bread
          width={width}
          height={height}
          outerBorderWidth={borderWidth}
          innerBorderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
          strokeOnly={strokeOnly}
        />
      )}
    </>
  )
}
