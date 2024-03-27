"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import { Form } from "@/src/components/Form";
import { SignDesignerVisualizer } from "@/src/components/SignDesigner/SignDesignerVisualizer";

type Shape = "rectangular" | "circular";

type Text = {
  text: string;
  fontSize: number;
};

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

export type Inputs = {
  shape: Shape;
  texts: Text[];
  color: ColorCombo;
};

export const SignDesignerForm = () => {
  const { register, control, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      shape: "rectangular",
      texts: [{ text: "123 Main Street", fontSize: 16 }],
      color: colorCombos[0],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "texts" });

  const addRow = () => {
    append({
      text: "",
      fontSize: 16,
    });
  };

  const deleteRow = (index: number) => {
    remove(index);
  };

  const inputs = watch();

  return (
    <>
      <Form
        action={() => {}}
        inputComponents={[
          <FormControl key="shape">
            <FormLabel id="shape-label">Shape</FormLabel>
            <RadioGroup
              aria-labelledby="shape-label"
              defaultValue="rectangular"
              name="shape"
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControlLabel
                  value="rectangular"
                  control={<Radio />}
                  label="Rectangular"
                  {...register("shape")}
                />
                <FormControlLabel
                  value="circular"
                  control={<Radio />}
                  label="Circular"
                  {...register("shape")}
                />
              </Box>
            </RadioGroup>
          </FormControl>,

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
                                  size="large"
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
                                      boxShadow: "0 0 0 2px black",
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
          />,

          <FormGroup key="text">
            <FormLabel>Text</FormLabel>
            <Grid container spacing={1} marginBottom={1}>
              {fields.map((field, index) => (
                <>
                  <Grid item xs={8}>
                    <TextField
                      placeholder="Enter your text here"
                      {...register(`texts.${index}.text`)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => deleteRow(index)}>
                              <DeleteForeverIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="number"
                      {...register(`texts.${index}.fontSize`)}
                      fullWidth
                    />
                  </Grid>
                </>
              ))}
            </Grid>
            <Button onClick={addRow}>Add text row</Button>
          </FormGroup>,
        ]}
        actionComponents={[]}
      />

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <SignDesignerVisualizer inputs={inputs} />
    </>
  );
};
