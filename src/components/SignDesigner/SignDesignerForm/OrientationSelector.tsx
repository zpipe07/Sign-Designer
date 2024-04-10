"use client"
import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import RadioGroup from "@mui/material/RadioGroup"
import Box from "@mui/material/Box"
import Radio from "@mui/material/Radio"

import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Orientation } from "@/src/components/SignDesigner/types"

export const OrientationSelector = () => {
  const { setValue, register } = useFormContext()

  const shape = useWatch({ name: "shape" })

  const orientations = designOptions[shape]
    ? (Object.keys(designOptions[shape]) as Orientation[])
    : []

  const selectedOrientation = useWatch({ name: "orientation" })

  useEffect(() => {
    setValue("orientation", orientations[0])
  }, [shape, setValue])

  return (
    <FormControl fullWidth>
      <FormLabel id="orientation-label">Orientation</FormLabel>
      <RadioGroup
        aria-labelledby="orientation-label"
        name="orientation"
      >
        <Box>
          {orientations.map((orientation) => {
            return (
              <FormControlLabel
                value={orientation}
                control={
                  <Radio
                    size="small"
                    checked={selectedOrientation === orientation}
                  />
                }
                label={orientation}
                key={orientation}
                {...register("orientation")}
              />
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}
