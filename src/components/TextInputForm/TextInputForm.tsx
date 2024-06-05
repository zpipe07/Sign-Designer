import { useForm } from "react-hook-form"
import { Button, Grid, TextField } from "@mui/material"

export const TextInputForm: React.FC = () => {
  const { handleSubmit, register } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="House Number"
            fullWidth
            {...register("houseNumber")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Street Name"
            fullWidth
            {...register("streetName")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Family Name"
            fullWidth
            {...register("familyName")}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
