"use client"

import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { useTheme } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import LinearProgress from "@mui/material/LinearProgress"

import { Size } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { SizeRadioLabel } from "@/src/components/SignDesigner/SignDesignerForm/SizeSelector/SizeRadioLabel"

export const SizeSelector: React.FC = () => {
  const theme = useTheme()

  const { register, setValue } = useFormContext()

  const selectedSize = useWatch({ name: "size" })

  const selectedShape = useWatch({ name: "shape" })

  const { data, isLoading } = useGetProduct(112)

  const purchasableVariants = data?.product.variants.filter(
    ({ availableForSale }) => availableForSale,
  )
  const selectedVariants = purchasableVariants?.filter(
    ({ selectedOptions }) => {
      return selectedOptions.some(({ name, value }) => {
        return name === "shape" && value === selectedShape
      })
    },
  )
  const options = selectedVariants?.map(
    ({ selectedOptions }) =>
      selectedOptions.find(({ name }) => name === "size")?.value,
  )

  useEffect(() => {
    if (!options?.includes(selectedSize)) {
      setValue("size", options?.[0])
    }
  }, [options, selectedSize, setValue])

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="size-label">Size</FormLabel>

      <RadioGroup
        aria-labelledby="size-label"
        name="size"
        sx={{
          justifyContent: "space-evenly",
          flexDirection: "row",

          [theme.breakpoints.up("md")]: {
            justifyContent: "flex-start",
          },
        }}
      >
        {options?.map((value) => {
          return (
            <FormControlLabel
              value={value}
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
                <SizeRadioLabel
                  size={value as Size}
                  checked={selectedSize === value}
                />
              }
              key={value}
              sx={{
                margin: 0,
                padding: 2.25,
              }}
              {...register("size")}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
