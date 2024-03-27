"use client";
import { useForm, useFieldArray } from "react-hook-form";
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

type Color =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

const colors: Color[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

export type Inputs = {
  shape: Shape;
  texts: Text[];
  backgroundColor: Color;
  textColor: Color;
};

export const SignDesignerForm = () => {
  const { register, control, watch } = useForm<Inputs>({
    defaultValues: {
      texts: [{ text: "123 Main Street", fontSize: 16 }],
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
          <FormControl key="background-color">
            <FormLabel id="background-color-label">Background color</FormLabel>
            <RadioGroup
              aria-labelledby="background-color-label"
              defaultValue="rectangular"
              name="backgroundColor"
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {colors.map((backgroundColor) => (
                  <FormControlLabel
                    value={backgroundColor}
                    control={
                      <Tooltip
                        arrow
                        title={backgroundColor}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -14],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Radio
                          size="large"
                          sx={{
                            color: backgroundColor,

                            "&.Mui-checked": {
                              color: backgroundColor,
                            },
                          }}
                        />
                      </Tooltip>
                    }
                    label={null}
                    {...register("backgroundColor")}
                    key={backgroundColor}
                  />
                ))}
              </Box>
            </RadioGroup>
          </FormControl>,
          <FormControl key="text-color">
            <FormLabel id="text-color-label">Text color</FormLabel>
            <RadioGroup
              aria-labelledby="text-color-label"
              defaultValue="rectangular"
              name="textColor"
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {colors.map((backgroundColor) => (
                  <FormControlLabel
                    value={backgroundColor}
                    control={
                      <Tooltip
                        arrow
                        title={backgroundColor}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -14],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Radio
                          size="large"
                          sx={{
                            color: backgroundColor,

                            "&.Mui-checked": {
                              color: backgroundColor,
                            },
                          }}
                        />
                      </Tooltip>
                    }
                    label={null}
                    {...register("textColor")}
                    key={backgroundColor}
                  />
                ))}
              </Box>
            </RadioGroup>
          </FormControl>,
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
