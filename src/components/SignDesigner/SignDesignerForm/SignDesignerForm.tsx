"use client"
import { useForm, FormProvider } from "react-hook-form"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import { SignDesignerVisualizer } from "@/src/components/SignDesigner/SignDesignerVisualizer"
import {
  ColorCombo,
  ColorSelector,
  colorCombos,
  Decoration,
  DecorationSelector,
  FontFamily,
  FontSelector,
  Shape,
  ShapeSelector,
  Size,
  SizeSelector,
  TextInput,
  OrientationSelector,
  Orientation,
} from "@/src/components/SignDesigner/SignDesignerForm"

export type TextLines = { value: string }[]

export type DesignFormInputs = {
  shape: Shape
  orientation: Orientation
  size: Size
  textLines: TextLines
  color: ColorCombo
  fontFamily: FontFamily
  decoration: Decoration | ""
}

export const SignDesignerForm = () => {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: "rectangle",
      orientation: "horizontal",
      size: "small",
      textLines: [{ value: "" }, { value: "" }, { value: "" }],
      color: colorCombos[0],
      fontFamily: "Times",
      decoration: "",
    },
  })

  const { handleSubmit } = formMethods

  const onSubmit = (data: DesignFormInputs) => {
    console.log({ data })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {/* <Grid item xs={5} sm={3} md={5}>
              <TextField
                label="Street number"
                {...register("streetNumber")}
                fullWidth
              />
            </Grid> */}

              {/* <Grid item xs={7} sm={5} md={7}>
              <TextField
                label="Street name"
                {...register("streetName")}
                fullWidth
              />
            </Grid> */}

              <Grid item xs={12}>
                <ShapeSelector />
              </Grid>

              <Grid item xs={12}>
                <OrientationSelector />
              </Grid>

              <Grid item xs={12}>
                <SizeSelector />
              </Grid>

              <Grid item xs={12}>
                <TextInput />
              </Grid>

              <Grid item xs={12} sm={4} md={12}>
                <FontSelector />
              </Grid>

              <Grid item xs={12}>
                <ColorSelector />
              </Grid>

              <Grid item xs={12}>
                <DecorationSelector />
              </Grid>

              {/* <Grid item xs={12}>
              <FormControl key="sides" fullWidth>
                <FormLabel id="sides-label">Sides</FormLabel>
                <RadioGroup
                  aria-labelledby="sides-label"
                  defaultValue={1}
                  name="sides"
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {sides.map((side) => (
                      <FormControlLabel
                        value={side}
                        control={<Radio />}
                        label={capitalize(side)}
                        {...register("sides")}
                        key={side}
                      />
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
            </Grid> */}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <SignDesignerVisualizer />
          </Grid>

          <Grid item xs={12} marginTop={4}>
            <Button variant="outlined" size="large">
              Save
            </Button>

            <Button variant="contained" size="large" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
