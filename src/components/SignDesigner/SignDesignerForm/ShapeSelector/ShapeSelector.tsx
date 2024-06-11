"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormHelperText from "@mui/material/FormHelperText"
import LinearProgress from "@mui/material/LinearProgress"

import { Shape } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { ShapeRadioLabel } from "@/src/components/SignDesigner/SignDesignerForm/ShapeSelector/ShapeRadioLabel"

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
      <FormLabel id="shape-label">Shape</FormLabel>
      {/* <FormHelperText sx={{ marginLeft: 0, marginBottom: 0 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Alias, dolores?
      </FormHelperText> */}

      <RadioGroup
        aria-labelledby="shape-label"
        name="shape"
        sx={{ justifyContent: "space-evenly", flexDirection: "row" }}
      >
        {data.productOptionsMap.shape.values.map(
          ({ label, entityId }) => {
            if (label === "top round") {
              return null
            }

            return (
              <FormControlLabel
                value={label}
                control={
                  <Radio
                    size="small"
                    checked={label === selectedShape}
                    sx={{
                      position: "fixed",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />
                }
                label={
                  <ShapeRadioLabel
                    shape={label as Shape}
                    checked={label === selectedShape}
                  />
                }
                key={entityId}
                sx={{
                  margin: 0,
                  padding: 2.25,
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
