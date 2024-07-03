"use client"

import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Size } from "@/src/components/SignDesigner/types"

export const TextInput: React.FC = () => {
  const { register } = useFormContext()

  const size: Size = useWatch({ name: "size" })

  const maxLinesOfText = SIZE_CONFIG_MAP[size].maxLinesOfText

  const { fields } = useFieldArray({
    name: "textLines",
  })

  return (
    <>
      <Grid container spacing={2}>
        {fields.slice(0, maxLinesOfText).map((field, index) => {
          let placeholder
          let label

          if (index === 0) {
            placeholder = "E.g. 123"
            label = "Primary"
          }

          if (index === 1) {
            placeholder = "E.g. Main Street"
            label = "Upper"
          }

          if (index === 2) {
            placeholder = "E.g. The Smith's"
            label = "Lower"
          }

          return (
            <Grid
              item
              xs={12}
              // sm={4}
              // md={6}
              // lg={4}
              order={index === 1 ? 1 : 2}
              key={field.id}
            >
              <Box display="flex">
                <TextField
                  fullWidth
                  // placeholder={placeholder}
                  label={label}
                  sx={{ flexGrow: 1, marginRight: 1 }}
                  inputProps={{
                    tabIndex: index === 1 ? 1 : 2,
                  }}
                  {...register(`textLines.${index}.value`)}
                />
                <TextField
                  type="number"
                  label="Size"
                  inputProps={{
                    step: "0.2",
                    min: "1",
                    max: "5",
                    tabIndex: index === 1 ? 1 : 2,
                  }}
                  sx={{ flex: "0 0 100px" }}
                  {...register(`textLines.${index}.fontSize`)}
                />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
