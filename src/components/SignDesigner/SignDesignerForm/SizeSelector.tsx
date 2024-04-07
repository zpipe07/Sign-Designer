import { useFormContext, useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

import { PreviewSvgProps } from "@/src/components/SVG/types"
import {
  Orientation,
  Shape,
  shapeIconMap,
} from "@/src/components/SignDesigner/SignDesignerForm"
import { designOptions } from "@/src/components/SignDesigner/SignDesignerForm/constants"

export type Size = "small" | "medium" | "large"

export const SizeSelector: React.FC = () => {
  const { register } = useFormContext()

  const shape: Shape = useWatch({ name: "shape" })
  const orientation: Orientation = useWatch({ name: "orientation" })
  const sizes = Object.keys(designOptions[shape][orientation]) as Size[]

  return (
    <FormControl fullWidth>
      <FormLabel id="size-label">Size</FormLabel>
      <RadioGroup aria-labelledby="size-label" defaultValue="large" name="size">
        <Box>
          {sizes.map((size) => {
            const ShapeIcon: React.FC<PreviewSvgProps> = shapeIconMap[shape]

            return (
              <FormControlLabel
                value={size}
                control={<Radio size="small" />}
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
