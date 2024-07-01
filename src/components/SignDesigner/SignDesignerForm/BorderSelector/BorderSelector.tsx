import { Controller, useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { Slider, TextField } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

const marks = [
  {
    value: 0,
    label: "None",
  },
  {
    value: 1,
    label: '1"',
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
        Border width: {selectedBorderWidth}"
      </FormLabel>
      <Controller
        control={control}
        render={(props) => {
          return (
            <Slider
              name="borderWidth"
              value={selectedBorderWidth}
              min={0}
              max={1}
              step={0.1}
              marks={marks}
              valueLabelDisplay="auto"
              onChange={(_, value) => props.field.onChange(value)}
            />
          )
        }}
        {...register("borderWidth")}
      />
    </FormControl>
  )
}
