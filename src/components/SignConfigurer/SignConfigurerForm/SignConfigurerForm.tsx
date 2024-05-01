"use client"

import { useFormContext } from "react-hook-form"
import { useTheme } from "@mui/material"
// import { useSWRConfig } from "swr"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import {
  MountingSelector,
  SidesSelector,
} from "@/src/components/SignConfigurer"
import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useCreateCart } from "@/src/hooks/mutations/useCreateCart"
import { useAddCartItem } from "@/src/hooks/mutations/useAddCartItem"
import { useUpdateCartItem } from "@/src/hooks/mutations/useUpdateCartItem"

type Props = {
  isEditing?: boolean
}

export const SignConfigurerForm: React.FC<Props> = ({
  isEditing,
}) => {
  // const { mutate } = useSWRConfig()

  const { mutate: createCart } = useCreateCart()

  const { mutate: addCartItem } = useAddCartItem()

  const { mutate: updateCartItem } = useUpdateCartItem()

  const router = useRouter()

  const { data, isLoading } = useGetCart()

  const theme = useTheme()

  const params = useParams<{ cartId: string; itemId: string }>()

  const { handleSubmit } = useFormContext<DesignFormInputs>()

  const onSubmit = async (formData: DesignFormInputs) => {
    if (isEditing) {
      // update cart item
      updateCartItem({
        cartId: params.cartId,
        itemId: params.itemId,
        formData,
      })
      // const updateCartItem = async () => {
      //   const res = await fetch(
      //     `/api/v1/cart/${params.cartId}/items/${params.itemId}`,
      //     {
      //       method: "PATCH",
      //       body: JSON.stringify(formData),
      //     },
      //   )
      //   const { cart } = await res.json()
      //   console.log({ cart })
      //   return cart
      // }

      // mutate("/api/v1/cart", updateCartItem, {
      //   populateCache: (cart) => cart,
      //   revalidate: false,
      // })

      return
    }

    if (data?.cart) {
      // update cart
      addCartItem({ cartId: data.cart.id, formData })
      // const addCartItem = async () => {
      //   const res = await fetch(`/api/v1/cart/${data.cart?.id}`, {
      //     method: "PUT",
      //     body: JSON.stringify(formData),
      //   })
      //   const { cart } = await res.json()
      //   console.log({ cart })
      //   return cart
      // }

      // mutate("/api/v1/cart", addCartItem, {
      //   populateCache: (cart) => cart,
      //   revalidate: false,
      // })
    } else {
      // create new cart
      createCart(formData)
      // const createCart = async () => {
      //   const res = await fetch("/api/v1/cart", {
      //     method: "POST",
      //     body: JSON.stringify(formData),
      //   })
      //   const { cart } = await res.json()
      //   console.log({ cart })
      //   return cart
      // }

      // mutate("/api/v1/cart", createCart, {
      //   populateCache: (cart) => cart,
      //   revalidate: false,
      // })
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
            href={
              isEditing
                ? `/cart/${params.cartId}/items/${params.itemId}`
                : "/design"
            }
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
