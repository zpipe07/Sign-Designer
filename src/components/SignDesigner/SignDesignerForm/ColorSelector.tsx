"use client"

import { useFormContext, useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Tooltip from "@mui/material/Tooltip"

import { ColorCombo } from "@/src/components/SignDesigner/types"

export const colorCombos: ColorCombo[] = [
  "black/white",
  "tan/green",
  "yellow/black",
]

export const ColorSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedColor = useWatch({ name: "color" })

  return (
    <FormControl fullWidth>
      <FormLabel id="color-label" sx={{ marginBottom: 1 }}>
        Select your sign colors
      </FormLabel>
      <RadioGroup aria-labelledby="color-label" name="color">
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {colorCombos.map((colorCombo) => {
            const [foregroundColor, backgroundColor] =
              colorCombo.split("/")

            return (
              <FormControlLabel
                value={colorCombo}
                control={
                  <Radio
                    size="small"
                    checked={selectedColor === colorCombo}
                  />
                }
                label={
                  <Tooltip
                    arrow
                    title={`${foregroundColor}/${backgroundColor}`}
                  >
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        border: "2px solid",
                        height: 50,
                        width: 50,
                        transition: "box-shadow 0.15s ease-in-out 0s",

                        ":before, :after": {
                          content: "''",
                          position: "absolute",
                          left: 0,
                          height: "50%",
                          width: "100%",
                        },

                        ":before": {
                          top: 0,
                          backgroundColor: foregroundColor,
                        },
                        ":after": {
                          bottom: 0,
                          backgroundColor: backgroundColor,
                        },

                        "&.Mui-checked": {
                          boxShadow: "0 0 0 3px black",
                          color: "inherit",
                        },
                      }}
                    />
                  </Tooltip>
                }
                key={colorCombo}
                {...register("color")}
              ></FormControlLabel>
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}
