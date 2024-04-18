"use client"
import { useFormContext } from "react-hook-form"
import { useTheme } from "@mui/material"
import Link from "next/link"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  MountingSelector,
  SidesSelector,
} from "@/src/components/SignConfigurer"
import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { CartItem } from "@/src/lib/bigcommerce/types"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"

export const SignConfigurerForm: React.FC = () => {
  const { data: cart, isLoading } = useGetCart(
    "0a98b86b-2d20-4610-a160-d1366fffd65a",
  )

  const theme = useTheme()

  const { handleSubmit } = useFormContext<DesignFormInputs>()

  const onSubmit = async (formData: DesignFormInputs) => {
    const lineItem = formDataToCartItem(formData)

    if (cart) {
      // update cart
      const res = await fetch(`/api/v1/cart/${cart.entityId}`, {
        method: "PUT",
        body: JSON.stringify({
          lineItems: [lineItem],
        }),
      })
      const data = await res.json()

      console.log({ data })
    } else {
      // create new cart
      const res = await fetch("/api/v1/cart", {
        method: "POST",
        body: JSON.stringify({
          lineItems: [lineItem],
        }),
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
