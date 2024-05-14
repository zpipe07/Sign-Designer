import opentype from "opentype.js"
import Typography from "@mui/material/Typography"

import {
  Color,
  DesignFormInputs,
  TextLine,
} from "@/src/components/SignDesigner/types"
import { Rectangle } from "@/src/components/SVG/Rectangle"
import { Ellipse } from "@/src/components/SVG/Ellipse"
import { TopRound } from "@/src/components/SVG/TopRound"
import { SideRound } from "@/src/components/SVG/SideRound"
import { Bread } from "@/src/components/SVG/Bread"
import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

type Props = {
  inputs: DesignFormInputs
  font: opentype.Font
}

export const SignDesignerVisualizerView: React.FC<Props> = ({
  inputs,
  font,
}) => {
  const width = 400
  const height = 250
  const borderWidth = 20

  const maxLinesOfText =
    designOptions[inputs.shape]?.[inputs.orientation]?.[inputs.size]
      ?.maxLinesOfText
  const textLines: TextLine[] = inputs?.textLines
    ?.slice(0, maxLinesOfText)
    .filter(({ value }: TextLine) => {
      return !!value
    })
  const [foregroundColor, backgroundColor] =
    (inputs?.color?.split("/") as Color[]) || []

  const { data } = useGetProduct(112)

  const rectangleId = data?.productOptionsMap.shape.values.find(
    ({ label }) => label === "rectangle",
  )?.entityId
  const ellipseId = data?.productOptionsMap.shape.values.find(
    ({ label }) => label === "ellipse",
  )?.entityId

  if (
    !data ||
    !data.productOptionsMap ||
    !data.productOptionsMap.shape
  ) {
    return null
  }

  return (
    <>
      {inputs[data.productOptionsMap.shape.id] ===
        rectangleId?.toString() && (
        <Rectangle
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}

      {inputs[data.productOptionsMap.shape.id] ===
        ellipseId?.toString() && (
        <Ellipse
          width={width}
          height={height + 40}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}

      {inputs.shape === "topRound" && (
        <TopRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}

      {inputs.shape === "sideRound" && (
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
      )}

      {inputs.shape === "bread" && (
        <Bread
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          font={font}
        />
      )}
    </>
  )
}
