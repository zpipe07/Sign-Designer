"use client"

import { useFormContext } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormHelperText from "@mui/material/FormHelperText"

import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { TopRoundPreview } from "@/src/components/SVG/TopRoundPreview"
import { RectanglePreview } from "@/src/components/SVG/RectanglePreview"
import { EllipsePreview } from "@/src/components/SVG/EllipsePreview"
import { SideRoundPreview } from "@/src/components/SVG/SideRoundPreview"
import { PreviewSvgProps } from "@/src/components/SVG/types"
import { BreadPreview } from "@/src/components/SVG/BreadPreview"
import { Shape } from "@/src/components/SignDesigner/types"
// import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
// import { signProductId } from "@/src/lib/bigcommerce/mappers"

export const shapeIconMap: {
  [key in Shape]: React.FC<PreviewSvgProps>
} = {
  rectangle: RectanglePreview,
  ellipse: EllipsePreview,
  topRound: TopRoundPreview,
  sideRound: SideRoundPreview,
  bread: BreadPreview,
}

const shapes = Object.keys(designOptions) as Shape[]

export const ShapeSelector: React.FC = () => {
  const { register } = useFormContext()

  // const { data } = useGetProduct(signProductId)

  // if (!data) {
  //   return null
  // }

  // const option = data.product.options.find(
  //   ({ name }) => name === "shape",
  // )
  // console.log({ data, option })

  return (
    <FormControl fullWidth>
      <FormLabel id="shape-label">Select your sign shape</FormLabel>
      <FormHelperText sx={{ marginLeft: 0, marginBottom: 1 }}>
        Some sign shapes can fit more text than others
      </FormHelperText>

      {/* <RadioGroup>
        {option?.values.map(({ label, entityId }) => {
          return (
            <FormControlLabel
              label={label}
              value={entityId}
              control={<Radio size="small" />}
              key={entityId}
              {...register(option.id)}
            />
          )
        })}
      </RadioGroup> */}

      <RadioGroup
        aria-labelledby="shape-label"
        defaultValue="rectangle"
        name="shape"
        sx={{ flexDirection: "row" }}
      >
        {shapes.map((shape) => {
          const ShapeIcon: React.FC<PreviewSvgProps> =
            shapeIconMap[shape]

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
      </RadioGroup>
    </FormControl>
  )
}
