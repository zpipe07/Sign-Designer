"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material"

import { FontFamily } from "@/src/components/SignDesigner/types"
import {
  Albert,
  Arbutus,
  Cormorant,
  Expletus,
  Playfair,
  Comfortaa,
  Danfo,
  Sansita,
} from "@/src/fonts"

const fontFamilies: FontFamily[] = [
  "Albert",
  "Expletus",
  "Playfair",
  "Cormorant",
  "Arbutus",
  "Comfortaa",
  "Danfo",
  "Sansita",
]

const fontMap = {
  Albert,
  Expletus,
  Playfair,
  Cormorant,
  Arbutus,
  Comfortaa,
  Danfo,
  Sansita,
}

export const FontSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedFontFamily = useWatch({ name: "fontFamily" })

  const theme = useTheme()

  return (
    <FormControl fullWidth>
      <FormLabel id="font-label" sx={{ marginBottom: 1 }}>
        Font
      </FormLabel>

      <RadioGroup name="fontFamily" sx={{ flexDirection: "row" }}>
        {fontFamilies.map((fontFamily) => (
          <FormControlLabel
            key={fontFamily}
            value={fontFamily}
            control={
              <Radio
                sx={{
                  position: "fixed",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            }
            checked={fontFamily === selectedFontFamily}
            {...register("fontFamily")}
            sx={{
              marginRight: 2,
              marginLeft: 0,
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

                  ...(selectedFontFamily === fontFamily && {
                    boxShadow: `0 0 0 3px ${theme.palette.secondary.main}`,
                  }),
                }}
              >
                <span className={fontMap[fontFamily].className}>
                  Aa
                </span>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
