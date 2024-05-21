"use client"

import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"

import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Orientation,
  Shape,
  Size,
} from "@/src/components/SignDesigner/types"

export const TextInput: React.FC = () => {
  const { register } = useFormContext()

  const shape: Shape = useWatch({ name: "shape" })
  const orientation: Orientation = useWatch({ name: "orientation" })
  const size: Size = useWatch({ name: "size" })

  const maxLinesOfText =
    SIZE_CONFIG_MAP[size][orientation].maxLinesOfText

  const { fields } = useFieldArray({
    name: "textLines",
  })

  return (
    <>
      <InputLabel>Text</InputLabel>

      <Grid container spacing={1}>
        {fields.slice(0, maxLinesOfText).map((field, index) => {
          // if (size === "medium" && index > 1) {
          //   return null
          // }

          // if (size === "small" && index > 0) {
          //   return null
          // }

          let placeholder

          if (index === 0) {
            placeholder = "E.g. 123"
          }

          if (index === 1) {
            placeholder = "E.g. Main Street"
          }

          if (index === 2) {
            placeholder = "E.g. The Smith's"
          }

          return (
            <Grid item xs={12} key={field.id}>
              <TextField
                {...register(`textLines.${index}.value`)}
                placeholder={placeholder}
                fullWidth
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
