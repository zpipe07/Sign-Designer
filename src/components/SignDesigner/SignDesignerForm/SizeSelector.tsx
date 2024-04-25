"use client"
import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Orientation,
  Shape,
  Size,
} from "@/src/components/SignDesigner/types"
import FormHelperText from "@mui/material/FormHelperText"

export const SizeSelector: React.FC = () => {
  const { register, setValue } = useFormContext()

  const shape: Shape = useWatch({ name: "shape" })
  const orientation: Orientation = useWatch({ name: "orientation" })
  const sizes = designOptions[shape]?.[orientation]
    ? (Object.keys(designOptions[shape][orientation]) as Size[])
    : []

  const selectedSize = useWatch({ name: "size" })

  useEffect(() => {
    setValue("size", sizes[0])
  }, [shape, orientation, setValue])

  return (
    <FormControl fullWidth>
      <FormLabel id="size-label">Select your sign size</FormLabel>
      <FormHelperText
        sx={{
          marginLeft: 0,
        }}
      >
        Select a size to see actual dimensions
      </FormHelperText>

      <RadioGroup aria-labelledby="size-label" name="size">
        <Box>
          {sizes.map((size) => {
            return (
              <FormControlLabel
                value={size}
                control={
                  <Radio
                    size="small"
                    checked={selectedSize === size}
                  />
                }
                label={size}
                // label={
                //   <>
                //     {size === "large" && <ShapeIcon height={60} width={75} />}
                //     {size === "medium" && <ShapeIcon height={45} width={60} />}
                //     {size === "small" && <ShapeIcon height={35} width={50} />}
                //   </>
                // }
                key={size}
                {...register("size", {
                  // onChange: (event) => {
                  //   const { value } = event.target;
                  //   if (value === "small") {
                  //     return setValue("textLines", [
                  //       { value: textLines[0].value },
                  //     ]);
                  //   }
                  //   if (value === "medium") {
                  //     return setValue("textLines", [
                  //       { value: textLines[0].value },
                  //       { value: textLines[1]?.value || "" },
                  //     ]);
                  //   }
                  //   if (value === "large") {
                  //     return setValue("textLines", [
                  //       { value: textLines[0].value },
                  //       { value: textLines[1]?.value || "" },
                  //       { value: textLines[2]?.value || "" },
                  //     ]);
                  //   }
                  // },
                })}
              />
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}
