"use client"

import { useFormContext } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  ColorSelector,
  DecorationSelector,
  FontSelector,
  ShapeSelector,
  SizeSelector,
  TextInput,
  OrientationSelector,
} from "@/src/components/SignDesigner/SignDesignerForm"

type Props = {
  isEditing?: boolean
}

export const SignDesignerForm: React.FC<Props> = ({ isEditing }) => {
  const router = useRouter()

  const params = useParams<{ cartId: string; itemId: string }>()

  const { handleSubmit } = useFormContext()

  const onSubmit = (data: any) => {
    if (isEditing) {
      router.push(
        `/cart/${params.cartId}/items/${params.itemId}/configure`,
      )
      return
    }

    router.push("/design/configure")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextInput />
            </Grid>

            <Grid item xs={12}>
              <ShapeSelector />
            </Grid>

            {/* <Grid item xs={12}>
              <OrientationSelector />
            </Grid> */}

            <Grid item xs={12}>
              <SizeSelector />
            </Grid>

            <Grid item xs={12}>
              <ColorSelector />
            </Grid>

            <Grid item xs={12}>
              <FontSelector />
            </Grid>

            {/* <Grid item xs={12}>
              <DecorationSelector />
            </Grid> */}
          </Grid>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          {/* <Button variant="outlined" size="large">
            Save
          </Button> */}

          <Button variant="contained" size="large" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
