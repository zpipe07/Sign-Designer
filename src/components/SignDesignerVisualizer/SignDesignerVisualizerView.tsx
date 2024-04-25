import { Rectangle } from "@/src/components/SVG/Rectangle"
import { Ellipse } from "@/src/components/SVG/Ellipse"
import { TopRound } from "@/src/components/SVG/TopRound"
import { SideRound } from "@/src/components/SVG/SideRound"
import { Bread } from "@/src/components/SVG/Bread"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"

type Props = {
  inputs: DesignFormInputs
}

export const SignDesignerVisualizerView: React.FC<Props> = ({
  inputs,
}) => {
  const width = 400
  const height = 250
  const borderWidth = 20

  return (
    <>
      {inputs.shape === "rectangle" && (
        <Rectangle
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
        />
      )}

      {inputs.shape === "ellipse" && (
        <Ellipse
          width={width}
          height={height + 40}
          borderWidth={borderWidth}
          inputs={inputs}
        />
      )}

      {inputs.shape === "topRound" && (
        <TopRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
        />
      )}

      {inputs.shape === "sideRound" && (
        <SideRound
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
        />
      )}

      {inputs.shape === "bread" && (
        <Bread
          width={width}
          height={height}
          borderWidth={borderWidth}
          inputs={inputs}
        />
      )}
    </>
  )
}
