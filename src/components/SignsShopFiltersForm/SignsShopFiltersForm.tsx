import { useFieldArray, useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"

import { ColorSelector } from "@/src/components/SignDesigner/SignDesignerForm"
import { FormControl, FormLabel } from "@mui/material"

type Props = {
  onSubmit: any
}

export const SignsShopFiltersForm: React.FC<Props> = ({
  onSubmit,
}) => {
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
      <Grid container spacing={2} marginBottom={1}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1 }}>
              Preview text
            </FormLabel>
            <Grid container spacing={1}>
              {fields.map((field, index) => {
                let label

                if (index === 0) {
                  label = "Primary"
                }

                if (index === 1) {
                  label = "Upper"
                }

                if (index === 2) {
                  label = "Lower"
                }

                return (
                  <Grid
                    item
                    key={field.id}
                    xs={12}
                    order={index === 1 ? 1 : 2}
                  >
                    <TextField
                      label={label}
                      size="small"
                      fullWidth
                      inputProps={{
                        tabIndex: index === 1 ? 1 : 2,
                      }}
                      {...register(`textLines.${index}.value`)}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ColorSelector />
        </Grid>
      </Grid>

      <Button type="submit">Apply</Button>

      <Button onClick={handleReset}>Clear all</Button>
    </form>
  )
}
