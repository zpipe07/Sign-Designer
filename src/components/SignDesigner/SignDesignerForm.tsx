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

import { Form } from "@/src/components/Form";

type Shape = "rectangular" | "circular";

type Text = {
  text: string;
  // fontSize: number;
};

type Inputs = {
  shape: Shape;
  texts: Text[];
};

export const SignDesignerForm = () => {
  const { register, control } = useForm<Inputs>({
    defaultValues: {
      texts: [{ text: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "texts" });

  const addRow = () => {
    append({
      text: "",
    });
  };

  const deleteRow = (index: number) => {
    remove(index);
  };

  return (
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
            <Box sx={{ display: "flex" }}>
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
        <FormGroup key="text">
          <FormLabel>Text</FormLabel>
          <Grid container spacing={1} marginBottom={1}>
            {fields.map((field, index) => (
              <Grid item xs={12} key={field.id}>
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
                />
              </Grid>
            ))}
          </Grid>
          <Button onClick={addRow}>Add row</Button>
        </FormGroup>,
      ]}
      actionComponents={[]}
    />
  );
};
