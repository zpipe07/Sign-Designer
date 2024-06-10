"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormHelperText from "@mui/material/FormHelperText"
import LinearProgress from "@mui/material/LinearProgress"
import capitalize from "@mui/material/utils/capitalize"

import { TopRoundPreview } from "@/src/components/SVG/TopRoundPreview"
import { RectanglePreview } from "@/src/components/SVG/RectanglePreview"
import { EllipsePreview } from "@/src/components/SVG/EllipsePreview"
import { SideRoundPreview } from "@/src/components/SVG/SideRoundPreview"
import { PreviewSvgProps } from "@/src/components/SVG/types"
import { BreadPreview } from "@/src/components/SVG/BreadPreview"
import { Shape } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { ShapeRadioLabel } from "@/src/components/ShapeRadioLabel"

// export const shapeIconMap: {
//   [key in Shape]: React.FC<PreviewSvgProps>
// } = {
//   rectangle: RectanglePreview,
//   ellipse: EllipsePreview,
//   "top round": TopRoundPreview,
//   // sideRound: SideRoundPreview,
//   // bread: BreadPreview,
// }

export const ShapeSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedShape = useWatch({ name: "shape" })

  const { data, isLoading } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="shape-label">Select your sign shape</FormLabel>
      <FormHelperText sx={{ marginLeft: 0, marginBottom: 0 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Alias, dolores?
      </FormHelperText>

      <RadioGroup
        aria-labelledby="shape-label"
        name="shape"
        sx={{ flexDirection: "row" }}
      >
        {data.productOptionsMap.shape.values.map(
          ({ label, entityId }) => {
            // const ShapeIcon: React.FC<PreviewSvgProps> =
            //   shapeIconMap[shape]

            return (
              <FormControlLabel
                value={label}
                control={<Radio size="small" />}
                label={
                  <ShapeRadioLabel
                    shape={label as Shape}
                    checked={label === selectedShape}
                  />
                }
                checked={label === selectedShape}
                key={entityId}
                sx={{
                  maxWidth: 125,
                }}
                {...register("shape")}
              />
            )
          },
        )}
      </RadioGroup>
    </FormControl>
  )
}
