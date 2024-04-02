"use client";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import capitalize from "@mui/material/utils/capitalize";

import { Form } from "@/src/components/Form";
import { SignDesignerVisualizer } from "@/src/components/SignDesigner/SignDesignerVisualizer";

type Shape = "rectangular" | "circular";

const shapes = ["rectangular", "circular"];

type Color = "black" | "white" | "tan" | "green" | "yellow";

type ColorCombo = {
  foregroundColor: Color;
  backgroundColor: Color;
};

const colorCombos: ColorCombo[] = [
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
];

type FontFamily = "Times" | "Verdana" | "Lucida Console" | "Cursive";

const fontFamilies: FontFamily[] = [
  "Times",
  "Verdana",
  "Lucida Console",
  "Cursive",
];

export type Inputs = {
  shape: Shape;
  streetNumber: string;
  streetName: string;
  color: ColorCombo;
  fontFamily: FontFamily;
};

export const SignDesignerForm = () => {
  const { register, control, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      shape: "rectangular",
      streetNumber: "",
      streetName: "",
      color: colorCombos[0],
      fontFamily: "Times",
    },
  });

  const inputs = watch();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* shape */}
          <FormControl key="shape" fullWidth>
            <FormLabel id="shape-label">Shape</FormLabel>
            <RadioGroup
              aria-labelledby="shape-label"
              defaultValue="rectangular"
              name="shape"
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {shapes.map((shape) => (
                  <FormControlLabel
                    value={shape}
                    control={<Radio />}
                    label={capitalize(shape)}
                    {...register("shape")}
                    key={shape}
                  />
                ))}
              </Box>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={5} sm={3}>
          {/* street number */}
          <TextField
            label="Street number"
            {...register("streetNumber")}
            fullWidth
          />
        </Grid>

        <Grid item xs={7} sm={5}>
          {/* street name */}
          <TextField
            label="Street name"
            {...register("streetName")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* font */}
          <FormControl key="font" fullWidth>
            <InputLabel id="font-label">Font</InputLabel>
            <Select
              labelId="font-label"
              label="Font"
              native
              {...register("fontFamily")}
            >
              {fontFamilies.map((fontFamily) => (
                <option value={fontFamily} key={fontFamily}>
                  {fontFamily}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          {/* color */}
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
                        const { foregroundColor, backgroundColor } = colorCombo;
                        return (
                          <FormControlLabel
                            onChange={(event) => {
                              const target = event.target as HTMLInputElement;
                              onChange(JSON.parse(target.value));
                            }}
                            value={JSON.stringify(colorCombo)}
                            key={JSON.stringify(colorCombo)}
                            label={null}
                            sx={{ marginLeft: 0 }}
                            control={
                              <Tooltip
                                arrow
                                title={`${foregroundColor}/${backgroundColor}`}
                              >
                                <Radio
                                  checkedIcon={<></>}
                                  icon={<></>}
                                  disableRipple
                                  sx={{
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    position: "relative",
                                    border: "2px solid",
                                    height: 60,
                                    width: 60,
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
                        );
                      })}
                    </Box>
                  </RadioGroup>
                </FormControl>
              );
            }}
            key="color"
          />
        </Grid>
      </Grid>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <SignDesignerVisualizer inputs={inputs} />
    </>
  );
};
