"use client"
import { useFormContext } from "react-hook-form"
import Link from "next/link"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  MountingSelector,
  SidesSelector,
} from "@/src/components/SignConfigurer"
import { useGetCart } from "@/src/hooks/queries/useGetCart"

export const SignConfigurerForm: React.FC = () => {
  const { data: cart, isLoading } = useGetCart(
    "0a98b86b-2d20-4610-a160-d1366fffd65a",
  )

  const theme = useTheme()

  const { handleSubmit } = useFormContext()

  const onSubmit = async (formData: any) => {
    if (cart) {
      // update cart
      const res = await fetch(`/api/v1/cart/${cart.entityId}`, {
        method: "PUT",
        body: JSON.stringify({
          lineItems: [
            {
              quantity: 1,
              productEntityId: 112,
              variantEntityId: 77, // is this necessary?
              selectedOptions: {
                multipleChoices: [
                  { optionEntityId: 119, optionValueEntityId: 112 },
                  { optionEntityId: 118, optionValueEntityId: 110 },
                ],
                textFields: [
                  {
                    optionEntityId: 117,
                    text: "Example foobar text",
                  },
                ],
              },
            },
          ],
        }),
      })
      const data = await res.json()

      console.log({ data })
    } else {
      // create new cart
      const res = await fetch("/api/v1/cart", {
        method: "POST",
      })
      const data = await res.json()

      console.log({ data })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SidesSelector />
        </Grid>

        <Grid item xs={12}>
          <MountingSelector />
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Button
            component={Link}
            href="/design"
            variant="outlined"
            size="large"
            sx={{ marginRight: theme.spacing(1) }}
          >
            Back
          </Button>

          <Button variant="contained" size="large" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
