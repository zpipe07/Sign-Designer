import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Box from "@mui/material/Box"
import capitalize from "@mui/material/utils/capitalize"
import { useTheme } from "@mui/material"

import { EdgeStyle } from "@/src/components/SignDesigner/types"

const edgeStyleOptions: EdgeStyle[] = ["square", "round"]

export const EdgeSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedEdgeStyle = useWatch({ name: "edgeStyle" })

  const theme = useTheme()

  return (
    <FormControl fullWidth>
      <FormLabel id="edge-label">Edge style</FormLabel>
      <RadioGroup
        aria-labelledby="edge-label"
        name="edgeStyle"
        sx={{ flexDirection: "row" }}
      >
        {edgeStyleOptions.map((edgeStyle) => {
          const src = `/images/edge-styles/${edgeStyle}.svg`

          return (
            <FormControlLabel
              value={edgeStyle}
              control={
                <Radio
                  sx={{
                    position: "fixed",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              }
              sx={{
                padding: 0.5,
              }}
              label={
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    border: `2px solid ${theme.palette.common.white}`,
                    height: 60,
                    width: 60,
                    transition: "box-shadow 0.15s ease-in-out 0s",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    ...(selectedEdgeStyle === edgeStyle && {
                      boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
                    }),
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    sx={{ maxWidth: "70%" }}
                  />
                </Box>
              }
              key={edgeStyle}
              {...register("edgeStyle")}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
