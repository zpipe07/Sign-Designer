import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import { TextField } from "@mui/material"

export const BorderSelector: React.FC = () => {
  const { register } = useFormContext()

  return (
    <TextField
      type="number"
      label="Border width"
      inputProps={{
        step: "0.25",
        min: "0",
        max: "5",
      }}
      sx={{ minWidth: 100 }}
      {...register("borderWidth")}
    />
  )
}
