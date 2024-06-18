"use client"

import { useFormContext, useWatch } from "react-hook-form"
import FormControl from "@mui/material/FormControl"
import {
  Box,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material"

import { FontFamily } from "@/src/components/SignDesigner/types"
import {
  Albert,
  Arbutus,
  // Cormorant,
  Expletus,
  // Playfair,
  Comfortaa,
  Danfo,
  Sansita,
  AdventPro,
  JosefinSlab,
  Tourney,
  DMSerif,
  Sancreek,
  Rye,
  SpicyRice,
  Ultra,
  Shrikhand,
  BreeSerif,
  Cinzel,
  Codystar,
  BungeeShade,
  Limelight,
  Monoton,
  Audiowide,
  PaytoneOne,
  Lobster,
} from "@/src/fonts"

const fontFamilies: FontFamily[] = [
  "Albert",
  "Expletus",
  // "Playfair",
  // "Cormorant",
  "Arbutus",
  "Comfortaa",
  "Danfo",
  "Sansita",
  "AdventPro",
  "JosefinSlab",
  "Tourney",
  "DMSerif",
  "Sancreek",
  "Rye",
  "SpicyRice",
  "Ultra",
  "Shrikhand",
  "BreeSerif",
  "Cinzel",
  "Codystar",
  "BungeeShade",
  "Limelight",
  "Monoton",
  "Audiowide",
  "PaytoneOne",
  "Lobster",
]

const fontMap = {
  Albert,
  Expletus,
  // Playfair,
  // Cormorant,
  Arbutus,
  Comfortaa,
  Danfo,
  Sansita,
  AdventPro,
  JosefinSlab,
  Tourney,
  DMSerif,
  Sancreek,
  Rye,
  SpicyRice,
  Ultra,
  Shrikhand,
  BreeSerif,
  Cinzel,
  Codystar,
  BungeeShade,
  Limelight,
  Monoton,
  Audiowide,
  PaytoneOne,
  Lobster,
}

export const FontSelector: React.FC = () => {
  const { register } = useFormContext()

  const selectedFontFamily = useWatch({ name: "fontFamily" })

  const theme = useTheme()

  return (
    <FormControl fullWidth>
      <FormLabel id="font-label">Font</FormLabel>
      <FormHelperText sx={{ marginLeft: 0 }}>
        Selected: {selectedFontFamily}
      </FormHelperText>

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
                  fontSize: 26,

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
