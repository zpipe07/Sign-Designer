import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import RadioGroup from "@mui/material/RadioGroup"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"

const sides = ["single", "double"]

export const SidesSelector: React.FC = () => {
  return (
    <FormControl fullWidth>
      <FormLabel id="sides-label">Sides</FormLabel>
      <RadioGroup aria-labelledby="sides-label" name="sides">
        <Box>
          {sides.map((side) => {
            return (
              <FormControlLabel
                value={side}
                label={side}
                control={<Radio size="small" />}
                key={side}
              />
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}
