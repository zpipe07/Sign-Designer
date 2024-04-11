import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

const mountOptions = ["hanging", "wall mounted"]

export const MountingSelector: React.FC = () => {
  return (
    <FormControl fullWidth>
      <FormLabel id="mounting-label">Mounting style</FormLabel>
      <RadioGroup aria-labelledby="mounting-label" name="sides">
        <Box>
          {mountOptions.map((side) => {
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
