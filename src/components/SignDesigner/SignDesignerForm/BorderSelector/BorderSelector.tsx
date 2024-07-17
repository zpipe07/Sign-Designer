import { Controller, useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { Box, Slider } from "@mui/material"

const marks = [
  {
    value: 0,
    label: "None",
  },
  { value: 0.1, label: "|" },
  { value: 0.2, label: "|" },
  { value: 0.3, label: "|" },
  { value: 0.4, label: "|" },
  {
    value: 0.5,
    label: '0.5"',
  },
]

export const BorderSelector: React.FC = () => {
  const { register, control } = useFormContext()

  const selectedBorderWidth = useWatch({ name: "borderWidth" })

  return (
    <FormControl fullWidth>
      <FormLabel id="borderWidth" htmlFor="borderWidth">
        Border width: {selectedBorderWidth}&quot;
      </FormLabel>

      <Box paddingLeft={2} paddingRight={2}>
        <Controller
          control={control}
          render={(props) => {
            return (
              <Slider
                name="borderWidth"
                value={selectedBorderWidth}
                min={0}
                max={0.5}
                step={0.1}
                marks={marks}
                defaultValue={selectedBorderWidth}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  props.field.onChange(value.toString(10))
                }}
              />
            )
          }}
          {...register("borderWidth")}
        />
      </Box>
    </FormControl>
  )
}
