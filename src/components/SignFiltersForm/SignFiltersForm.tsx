import { useFieldArray, useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { ColorSelector } from "@/src/components/SignDesigner/SignDesignerForm"

type Props = {
  onSubmit: any
}

export const SignFiltersForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useFormContext()

  const { fields } = useFieldArray({
    name: "textLines",
  })

  const handleReset = () => {
    reset()
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {fields.map((field, index) => (
          <Box key={field.id}>
            <TextField
              label="Text"
              fullWidth
              {...register(`textLines.${index}.value`)}
            />
          </Box>
        ))}
      </Box>

      <Box>
        <ColorSelector />
      </Box>

      <Button type="submit">Apply</Button>

      <Button onClick={handleReset}>Clear all</Button>
    </form>
  )
}
