"use client"

import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import RadioGroup from "@mui/material/RadioGroup"
import Box from "@mui/material/Box"
import Radio from "@mui/material/Radio"
import LinearProgress from "@mui/material/LinearProgress"
import capitalize from "@mui/material/utils/capitalize"

import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Orientation } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

export const OrientationSelector: React.FC = () => {
  const { setValue, register } = useFormContext()

  const shape = useWatch({ name: "shape" })

  // const orientations = designOptions[shape]
  //   ? (Object.keys(designOptions[shape]) as Orientation[])
  //   : []

  const selectedOrientation = useWatch({ name: "orientation" })

  const { data, isLoading } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  // useEffect(() => {
  //   setValue("orientation", orientations[0])
  // }, [shape, setValue])

  return (
    <FormControl fullWidth>
      <FormLabel id="orientation-label">Orientation</FormLabel>
      <RadioGroup
        aria-labelledby="orientation-label"
        name="orientation"
        sx={{ flexDirection: "row" }}
      >
        {data.productOptionsMap.orientation.values.map(
          ({ label }) => {
            return (
              <FormControlLabel
                value={label}
                control={
                  <Radio
                    size="small"
                    checked={selectedOrientation === label}
                  />
                }
                label={capitalize(label)}
                key={label}
                {...register("orientation")}
              />
            )
          },
        )}
      </RadioGroup>
    </FormControl>
  )
}
