"use client"
import { useFormContext } from "react-hook-form"
import { useTheme } from "@mui/material"
import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  MountingSelector,
  SidesSelector,
} from "@/src/components/SignConfigurer"
import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const SignConfigurerForm: React.FC = () => {
  const { mutate } = useSWRConfig()

  const router = useRouter()

  const { data, isLoading } = useGetCart()

  const theme = useTheme()

  const { handleSubmit } = useFormContext<DesignFormInputs>()

  const onSubmit = async (formData: DesignFormInputs) => {
    if (data?.cart) {
      // update cart
      const updateCartItem = async () => {
        const res = await fetch(`/api/v1/cart/${data.cart?.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        })
        const { cart } = await res.json()
        console.log({ cart })
        return cart
      }

      mutate("/api/v1/cart", updateCartItem, {
        populateCache: (cart) => cart,
        revalidate: false,
      })
    } else {
      // create new cart
      const createCart = async () => {
        const res = await fetch("/api/v1/cart", {
          method: "POST",
          body: JSON.stringify(formData),
        })
        const { cart } = await res.json()
        console.log({ cart })
        return cart
      }

      mutate("/api/v1/cart", createCart, {
        populateCache: (cart) => cart,
        revalidate: false,
      })
    }

    router.push("/cart")
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
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
