import { Controller, useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Tooltip from "@mui/material/Tooltip"

import { ColorCombo } from "@/src/components/SignDesigner/types"

export const colorCombos: ColorCombo[] = [
  {
    foregroundColor: "black",
    backgroundColor: "white",
  },
  {
    foregroundColor: "tan",
    backgroundColor: "green",
  },
  {
    foregroundColor: "yellow",
    backgroundColor: "black",
  },
]

export const ColorSelector: React.FC = () => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name="color"
      render={({ field: { onChange } }) => {
        return (
          <FormControl>
            <FormLabel id="color-label">Color</FormLabel>
            <RadioGroup
              aria-labelledby="color-label"
              defaultValue={JSON.stringify(colorCombos[0])}
              name="color"
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {colorCombos.map((colorCombo) => {
                  const { foregroundColor, backgroundColor } =
                    colorCombo
                  return (
                    <FormControlLabel
                      onChange={(event) => {
                        const target =
                          event.target as HTMLInputElement
                        onChange(JSON.parse(target.value))
                      }}
                      value={JSON.stringify(colorCombo)}
                      key={JSON.stringify(colorCombo)}
                      sx={
                        {
                          // marginLeft: 0
                        }
                      }
                      control={<Radio size="small" />}
                      label={
                        <Tooltip
                          arrow
                          title={`${foregroundColor}/${backgroundColor}`}
                        >
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              position: "relative",
                              border: "2px solid",
                              height: 50,
                              width: 50,
                              transition:
                                "box-shadow 0.15s ease-in-out 0s",

                              ":before, :after": {
                                content: "''",
                                position: "absolute",
                                left: 0,
                                height: "50%",
                                width: "100%",
                              },

                              ":before": {
                                top: 0,
                                backgroundColor: foregroundColor,
                              },
                              ":after": {
                                bottom: 0,
                                backgroundColor: backgroundColor,
                              },

                              "&.Mui-checked": {
                                boxShadow: "0 0 0 3px black",
                                color: "inherit",
                              },
                            }}
                          />
                        </Tooltip>
                      }
                    ></FormControlLabel>
                  )
                })}
              </Box>
            </RadioGroup>
          </FormControl>
        )
      }}
      key="color"
    />
  )
}
