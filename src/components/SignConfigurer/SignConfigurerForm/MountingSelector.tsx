import { useFormContext, useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import capitalize from "@mui/material/utils/capitalize"

import { MountingStyle } from "@/src/components/SignDesigner/types"

const mountOptions: MountingStyle[] = ["wall mounted", "hanging"]

export const MountingSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedMountingStyle = useWatch({ name: "mountingStyle" })

  return (
    <FormControl fullWidth>
      <FormLabel id="mounting-label">Mounting style</FormLabel>
      <RadioGroup
        aria-labelledby="mounting-label"
        name="mountingStyle"
        sx={{ flexDirection: "row" }}
      >
        {mountOptions.map((option) => {
          return (
            <FormControlLabel
              value={option}
              label={capitalize(option)}
              control={
                <Radio
                  size="small"
                  checked={selectedMountingStyle === option}
                />
              }
              key={option}
              {...register("mountingStyle")}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
