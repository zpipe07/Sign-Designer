import { Controller, useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { Box, Slider, TextField } from "@mui/material"
// import FormControlLabel from "@mui/material/FormControlLabel"
// import Radio from "@mui/material/Radio"
// import RadioGroup from "@mui/material/RadioGroup"

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
    // <TextField
    //   type="number"
    //   label="Border width"
    //   inputProps={{
    //     step: "0.2",
    //     min: "0",
    //     max: "5",
    //   }}
    //   sx={{ minWidth: 100 }}
    //   {...register("borderWidth")}
    // />
    // <Slider aria-label="border width" {...register("borderWidth")} />
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
