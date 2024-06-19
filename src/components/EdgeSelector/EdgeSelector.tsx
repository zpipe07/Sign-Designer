import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import capitalize from "@mui/material/utils/capitalize"

import { EdgeStyle } from "@/src/components/SignDesigner/types"

const edgeStyleOptions: EdgeStyle[] = ["square", "round"]

export const EdgeSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedEdgeStyle = useWatch({ name: "edgeStyle" })

  return (
    <FormControl fullWidth>
      <FormLabel id="edge-label">Edge style</FormLabel>
      <RadioGroup
        aria-labelledby="edge-label"
        name="edgeStyle"
        sx={{ flexDirection: "row" }}
      >
        {edgeStyleOptions.map((option) => {
          return (
            <FormControlLabel
              value={option}
              label={capitalize(option)}
              control={
                <Radio
                  size="small"
                  checked={selectedEdgeStyle === option}
                />
              }
              key={option}
              {...register("edgeStyle")}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
