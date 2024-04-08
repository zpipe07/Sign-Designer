import { useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export type FontFamily = "Times" | "Verdana" | "Lucida Console" | "Cursive";

const fontFamilies: FontFamily[] = [
  "Times",
  "Verdana",
  "Lucida Console",
  "Cursive",
];

export const FontSelector = () => {
  const { register } = useFormContext();

  return (
    <FormControl fullWidth>
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
  );
};