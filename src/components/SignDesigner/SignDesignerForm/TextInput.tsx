"use client"

import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { IconButton } from "@mui/material"

import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Size } from "@/src/components/SignDesigner/types"
import { FontSizeSelector } from "@/src/components/SignDesigner/SignDesignerForm/FontSizeSelector"
import { OffsetSelector } from "@/src/components/SignDesigner/SignDesignerForm/OffsetSelector"

export const TextInput: React.FC = () => {
  const { register } = useFormContext()

  const size: Size = useWatch({ name: "size" })

  const maxLinesOfText = SIZE_CONFIG_MAP[size].maxLinesOfText

  const { fields, swap } = useFieldArray({
    name: "textLines",
  })

  return (
    <Box position="relative">
      {maxLinesOfText >= 2 && (
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 98,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => swap(0, 1)}
        >
          <SwapVertIcon />
        </IconButton>
      )}

      {maxLinesOfText >= 3 && (
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 194,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => swap(0, 2)}
        >
          <SwapVertIcon />
        </IconButton>
      )}

      <Grid container spacing={5}>
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
              order={index === 1 ? 1 : 2}
              key={field.id}
            >
              <Box display="flex">
                <TextField
                  fullWidth
                  label={label}
                  sx={{ flexGrow: 1, marginRight: 1 }}
                  inputProps={{
                    tabIndex: index === 1 ? 1 : 2,
                  }}
                  {...register(`textLines.${index}.value`)}
                />

                <FontSizeSelector index={index} />

                <OffsetSelector index={index} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
