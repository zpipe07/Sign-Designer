"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormHelperText from "@mui/material/FormHelperText"
import LinearProgress from "@mui/material/LinearProgress"

// import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { TopRoundPreview } from "@/src/components/SVG/TopRoundPreview"
import { RectanglePreview } from "@/src/components/SVG/RectanglePreview"
import { EllipsePreview } from "@/src/components/SVG/EllipsePreview"
import { SideRoundPreview } from "@/src/components/SVG/SideRoundPreview"
import { PreviewSvgProps } from "@/src/components/SVG/types"
import { BreadPreview } from "@/src/components/SVG/BreadPreview"
import { Shape } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

export const shapeIconMap: {
  [key in Shape]: React.FC<PreviewSvgProps>
} = {
  rectangle: RectanglePreview,
  ellipse: EllipsePreview,
  topRound: TopRoundPreview,
  sideRound: SideRoundPreview,
  bread: BreadPreview,
}

// const shapes = Object.keys(designOptions) as Shape[]

export const ShapeSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedShape = useWatch({ name: "shape" })

  const { data, isLoading, error } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="shape-label">Select your sign shape</FormLabel>
      <FormHelperText sx={{ marginLeft: 0, marginBottom: 1 }}>
        Some sign shapes can fit more text than others
      </FormHelperText>

      {/* <RadioGroup>
        {shapeOption.values.map(({ label, entityId }) => {
          return (
            <FormControlLabel
              label={label}
              value={entityId}
              control={<Radio size="small" />}
              key={entityId}
              {...register(shapeOption.id)}
            />
          )
        })}
      </RadioGroup> */}

      <RadioGroup
        aria-labelledby="shape-label"
        // defaultValue="rectangle"
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
                label={label}
                // checked={shape === selectedShape}
                key={entityId}
                sx={{
                  fontSize: 0,
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
