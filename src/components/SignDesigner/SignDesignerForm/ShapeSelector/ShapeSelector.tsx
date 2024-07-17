"use client"

import { useFormContext, useWatch } from "react-hook-form"
import { useTheme } from "@mui/material"
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
  const theme = useTheme()

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

      <RadioGroup
        aria-labelledby="shape-label"
        name="shape"
        sx={{
          justifyContent: "space-evenly",
          flexDirection: "row",

          [theme.breakpoints.up("md")]: {
            justifyContent: "flex-start",
          },
        }}
      >
        {data.productOptionsMap.shape.values.map(
          ({ label, entityId }) => {
            // if (label === "top round") {
            //   return null
            // }

            return (
              <FormControlLabel
                value={label}
                control={
                  <Radio
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
                  padding: 1,
                  flex: "0 1 33.33%",

                  [theme.breakpoints.up("sm")]: {
                    flex: "1 1 20%",
                  },

                  [theme.breakpoints.up("md")]: {
                    padding: 0.5,
                  },
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
