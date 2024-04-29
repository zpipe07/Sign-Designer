import { Rectangle } from "@/src/components/SVG/Rectangle"
import { Ellipse } from "@/src/components/SVG/Ellipse"
import { TopRound } from "@/src/components/SVG/TopRound"
import { SideRound } from "@/src/components/SVG/SideRound"
import { Bread } from "@/src/components/SVG/Bread"
import {
  DesignFormInputs,
  TextLine,
} from "@/src/components/SignDesigner/types"
import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"

type Props = {
  inputs: DesignFormInputs
}

export const SignDesignerVisualizerView: React.FC<Props> = ({
  inputs,
}) => {
  const width = 400
  const height = 250
  const borderWidth = 20

  const maxLinesOfText =
    designOptions[inputs.shape][inputs.orientation]?.[inputs.size]
      ?.maxLinesOfText
  const textLines: TextLine[] = inputs?.textLines
    .slice(0, maxLinesOfText)
    .filter(({ value }: TextLine) => {
      return !!value
    })

  return (
    <>
      {inputs.shape === "rectangle" && (
        <Rectangle
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
        />
      )}

      {inputs.shape === "ellipse" && (
        <Ellipse
          width={width}
          height={height + 40}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
        />
      )}

      {inputs.shape === "topRound" && (
        <TopRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
        />
      )}

      {inputs.shape === "sideRound" && (
        <SideRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
        />
      )}

      {inputs.shape === "bread" && (
        <Bread
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
          textLines={textLines}
        />
      )}
    </>
  )
}
