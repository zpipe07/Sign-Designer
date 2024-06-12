import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button, Grid, TextField } from "@mui/material"

export const TextInputForm: React.FC = () => {
  const { handleSubmit, register } = useForm()

  const router = useRouter()

  const onSubmit = (data: any) => {
    const values: string[] = Object.values(data)
    const qs = `textLines=${JSON.stringify(values)}&shape=bread`

    router.push(`/design?${qs}`)
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
