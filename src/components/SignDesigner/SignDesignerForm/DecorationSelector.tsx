"use client"

import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

import { FiligreeE } from "@/src/components/SVG/FiligreeE"
import { FiligreeQ } from "@/src/components/SVG/FiligreeQ"
import { FiligreeProps } from "@/src/components/SVG/types"
import { Decoration } from "@/src/components/SignDesigner/types"

const decorations: Decoration[] = ["foo", "bar"]

export const decorationIconMap: { [key in Decoration]: React.FC } = {
  foo: FiligreeE,
  bar: FiligreeQ,
}

export const DecorationSelector: React.FC = () => {
  const { register } = useFormContext()

  return (
    <FormControl fullWidth>
      <FormLabel>Decoration</FormLabel>
      <RadioGroup name="decoration">
        <Box>
          <FormControlLabel
            value=""
            control={<Radio size="small" />}
            label="None"
            {...register("decoration")}
          />

          {decorations.map((decoration) => {
            const Label: React.FC<FiligreeProps> =
              decorationIconMap[decoration]

            return (
              <FormControlLabel
                value={decoration}
                control={<Radio size="small" />}
                label={<Label height={50} width={50} />}
                {...register("decoration")}
                key={decoration}
              />
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}
