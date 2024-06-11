"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import LinearProgress from "@mui/material/LinearProgress"
import FormHelperText from "@mui/material/FormHelperText"

import { Size } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { SizeRadioLabel } from "@/src/components/SignDesigner/SignDesignerForm/SizeSelector/SizeRadioLabel"

export const SizeSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedSize = useWatch({ name: "size" })

  const { data, isLoading } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="size-label">Size</FormLabel>
      {/* <FormHelperText
        sx={{
          marginLeft: 0,
        }}
      >
        Select a size to see actual dimensions
      </FormHelperText> */}

      <RadioGroup
        aria-labelledby="size-label"
        name="size"
        sx={{ justifyContent: "space-evenly", flexDirection: "row" }}
      >
        {data.productOptionsMap.size.values.map(
          ({ label, entityId }) => {
            return (
              <FormControlLabel
                value={label}
                control={
                  <Radio
                    size="small"
                    checked={selectedSize === label}
                    sx={{
                      position: "fixed",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />
                }
                label={
                  <SizeRadioLabel
                    size={label as Size}
                    checked={selectedSize === label}
                  />
                }
                key={entityId}
                sx={{
                  margin: 0,
                  padding: 2.25,
                }}
                {...register("size")}
              />
            )
          },
        )}
      </RadioGroup>
    </FormControl>
  )
}
