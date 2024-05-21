"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import LinearProgress from "@mui/material/LinearProgress"

import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

// export const colorCombos: ColorCombo[] = [
//   "black/white",
//   "tan/green",
//   "yellow/black",
// ]

export const ColorSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedColor = useWatch({ name: "color" })

  const { data, isLoading } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="color-label" sx={{ marginBottom: 1 }}>
        Select your sign colors
      </FormLabel>
      <RadioGroup
        aria-labelledby="color-label"
        name="color"
        sx={{ flexDirection: "row" }}
      >
        {data.productOptionsMap.color.values.map(
          ({ label, entityId }) => {
            return (
              <FormControlLabel
                label={label}
                value={label}
                control={
                  <Radio
                    size="small"
                    checked={selectedColor === label}
                  />
                }
                key={entityId}
                {...register("color")}
              />
            )
          },
        )}
      </RadioGroup>
      {/* <RadioGroup aria-labelledby="color-label" name="color">
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
      </RadioGroup> */}
    </FormControl>
  )
}
