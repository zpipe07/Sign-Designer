"use client"

import { useFormContext, useWatch } from "react-hook-form"
import { Box, FormHelperText, useTheme } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import LinearProgress from "@mui/material/LinearProgress"

import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

export const ColorSelector: React.FC = () => {
  const theme = useTheme()

  const { register } = useFormContext()

  const selectedColor = useWatch({ name: "color" })

  const { data, isLoading } = useGetProduct(112)

  if (isLoading) {
    return <LinearProgress />
  }

  if (!data) {
    return null
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="color-label">Color</FormLabel>
      {selectedColor && (
        <FormHelperText sx={{ marginLeft: 0 }}>
          Selected: {selectedColor.replace("::", " & ")}
        </FormHelperText>
      )}

      <RadioGroup
        aria-labelledby="color-label"
        name="color"
        sx={{
          flexDirection: "row",
          justifyContent: "center",

          [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-start",
          },
        }}
      >
        {data.productOptionsMap.color.values.map(
          ({ label, entityId }) => {
            const [foregroundColor, backgroundColor] =
              label.split("::")

            return (
              <FormControlLabel
                label={
                  <Box
                    sx={{
                      fontSize: 0,
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      border: `2px solid ${theme.palette.common.white}`,
                      height: 60,
                      width: 60,
                      transition: "box-shadow 0.15s ease-in-out 0s",
                      transform: "rotate(-45deg)",
                      cursor: "pointer",
                      boxShadow: `0 0 10px -5px rgba(0, 0, 0, 0.5)`,

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
                        borderBottom: `1px solid ${theme.palette.common.white}`,
                      },
                      ":after": {
                        bottom: 0,
                        backgroundColor: backgroundColor,
                        borderTop: `1px solid ${theme.palette.common.white}`,
                      },

                      // "&.Mui-checked": {
                      //   boxShadow: "0 0 0 3px black",
                      //   color: "inherit",
                      // },

                      ...(selectedColor === label && {
                        boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
                      }),
                    }}
                  >
                    {label}
                  </Box>
                }
                value={label}
                control={
                  <Radio
                    size="small"
                    checked={selectedColor === label}
                    sx={{
                      position: "fixed",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />
                }
                key={entityId}
                sx={{
                  padding: 0.5,
                }}
                {...register("color")}
              />
            )
          },
        )}
      </RadioGroup>
      {/* <RadioGroup aria-labelledby="color-label" name="color">
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {colorCombos.map((colorCombo) => {
            const [foregroundColor, backgroundColor] =
              colorCombo.split("/")

            return (
              <FormControlLabel
                value={colorCombo}
                control={
                  <Radio
                    size="small"
                    checked={selectedColor === colorCombo}
                  />
                }
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
                        transition: "box-shadow 0.15s ease-in-out 0s",

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
                key={colorCombo}
                {...register("color")}
              ></FormControlLabel>
            )
          })}
        </Box>
      </RadioGroup> */}
    </FormControl>
  )
}
