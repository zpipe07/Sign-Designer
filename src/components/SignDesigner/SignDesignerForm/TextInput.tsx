"use client"

import { useRef } from "react"
import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import { SIZE_CONFIG_MAP } from "@/src/components/SignDesigner/SignDesignerForm/constants"
import { Size } from "@/src/components/SignDesigner/types"
import { Button, ButtonGroup } from "@mui/material"
import { FontSizeSelector } from "@/src/components/SignDesigner/SignDesignerForm/FontSizeSelector"
import { OffsetSelector } from "@/src/components/SignDesigner/SignDesignerForm/OffsetSelector"

const FONT_SIZE_STEP = 0.2
const OFFSET_STEP = 0.25

export const TextInput: React.FC = () => {
  const fontSizeRef = useRef<HTMLDivElement>(null)

  const offsetRef = useRef<HTMLDivElement>(null)

  const { register, setValue, getValues } = useFormContext()
  // console.log("getValues", getValues())

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

          const { ref, ...rest } = register(
            `textLines.${index}.fontSize`,
          )

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

                {/* <Box
                  sx={{
                    position: "relative",
                    flex: "0 0 100px",
                    marginRight: 1,
                  }}
                  ref={fontSizeRef}
                >
                  <TextField
                    type="number"
                    label="Size"
                    inputProps={{
                      step: "0.2",
                      min: "1",
                      max: "5",
                      tabIndex: index === 1 ? 1 : 2,
                    }}
                    {...register(`textLines.${index}.fontSize`)}
                  />
                  <ButtonGroup
                    orientation="vertical"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 1 }}
                      onClick={() => {
                        console.log({ fontSizeRef })
                        const input =
                          fontSizeRef.current?.querySelector("input")
                        console.log({ input })
                        input?.stepUp()
                        // const currentFontSize = parseFloat(
                        //   getValues().textLines[index].fontSize,
                        // )
                        // const rounded =
                        //   Math.round(currentFontSize * 100) / 100
                        // console.log({ currentFontSize, rounded })
                        // setValue(
                        //   `textLines.${index}.fontSize`,
                        //   (rounded + FONT_SIZE_STEP).toString(10),
                        // )
                      }}
                    >
                      <ArrowDropUpIcon />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 1 }}
                      onClick={() => {
                        fontSizeRef.current?.stepDown()
                        // const currentFontSize = parseFloat(
                        //   getValues().textLines[index].fontSize,
                        // )
                        // const rounded =
                        //   Math.round(currentFontSize * 100) / 100
                        // console.log({ currentFontSize, rounded })
                        // setValue(
                        //   `textLines.${index}.fontSize`,
                        //   (rounded - FONT_SIZE_STEP).toString(10),
                        // )
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                </Box> */}
                <FontSizeSelector index={index} />

                <OffsetSelector index={index} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
