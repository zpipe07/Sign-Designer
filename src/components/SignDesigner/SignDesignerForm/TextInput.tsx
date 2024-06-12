"use client"

import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Orientation,
  Size,
} from "@/src/components/SignDesigner/types"

export const TextInput: React.FC = () => {
  const { register } = useFormContext()

  const orientation: Orientation = useWatch({ name: "orientation" })
  const size: Size = useWatch({ name: "size" })

  const maxLinesOfText = SIZE_CONFIG_MAP[size].maxLinesOfText
  // SIZE_CONFIG_MAP[size][orientation].maxLinesOfText

  const { fields } = useFieldArray({
    name: "textLines",
  })

  return (
    <>
      <Grid container spacing={2}>
        {fields.slice(0, maxLinesOfText).map((field, index) => {
          // if (size === "medium" && index > 1) {
          //   return null
          // }

          // if (size === "small" && index > 0) {
          //   return null
          // }

          let placeholder
          let label

          if (index === 0) {
            placeholder = "E.g. 123"
            label = "House Number"
          }

          if (index === 1) {
            placeholder = "E.g. Main Street"
            label = "Street Name"
          }

          if (index === 2) {
            placeholder = "E.g. The Smith's"
            label = "Family Name"
          }

          return (
            <Grid item xs={12} sm={4} md={6} lg={4} key={field.id}>
              <TextField
                fullWidth
                // placeholder={placeholder}
                label={label}
                {...register(`textLines.${index}.value`)}
              />
              {/* <Controller
                name={`textLines.${index}.value`}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      fullWidth
                      value={value}
                      // placeholder={placeholder}
                      onChange={onChange}
                      // onChange={debounce((e) => {
                      //   onChange(e)
                      // }, 500)}
                    />
                  )
                }}
              /> */}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
