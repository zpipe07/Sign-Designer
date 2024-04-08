import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

import { TopRoundPreview } from "@/src/components/SVG/TopRoundPreview"
import { RectanglePreview } from "@/src/components/SVG/RectanglePreview"
import { EllipsePreview } from "@/src/components/SVG/EllipsePreview"
import { SideRoundPreview } from "@/src/components/SVG/SideRoundPreview"
import { PreviewSvgProps } from "@/src/components/SVG/types"
import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export type Shape = "rectangle" | "ellipse" | "topRound" | "sideRound"

// const shapes: Shape[] = ["rectangle", "ellipse", "topRound", "sideRound"];

export const shapeIconMap: { [key in Shape]: React.FC<PreviewSvgProps> } = {
  rectangle: RectanglePreview,
  ellipse: EllipsePreview,
  topRound: TopRoundPreview,
  sideRound: SideRoundPreview,
}

const shapes = Object.keys(designOptions) as Shape[]

export const ShapeSelector: React.FC = () => {
  const { register } = useFormContext()

  return (
    <FormControl fullWidth>
      <FormLabel id="shape-label">Shape</FormLabel>
      <RadioGroup
        aria-labelledby="shape-label"
        defaultValue="rectangle"
        name="shape"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {shapes.map((shape) => {
            const ShapeIcon: React.FC<PreviewSvgProps> = shapeIconMap[shape]

            return (
              <FormControlLabel
                value={shape}
                control={<Radio size="small" />}
                label={<ShapeIcon />}
                {...register("shape")}
                sx={{
                  fontSize: 0,
                }}
                key={shape}
              />
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}