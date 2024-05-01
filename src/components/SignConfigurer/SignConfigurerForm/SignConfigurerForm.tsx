"use client"

import { useFormContext } from "react-hook-form"
import { useTheme } from "@mui/material"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"

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
  const onSuccess = () => {
    router.push("/cart")
  }

  const { mutate: createCart, isPending: isPendingCreateCart } =
    useCreateCart({ onSuccess })

  const { mutate: addCartItem, isPending: isPendingAddCartItem } =
    useAddCartItem({ onSuccess })

  const {
    mutate: updateCartItem,
    isPending: isPendingUpdateCartItem,
  } = useUpdateCartItem({ onSuccess })

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

      return
    }

    if (data?.cart) {
      // update cart
      addCartItem({ cartId: data.cart.id, formData })
    } else {
      // create new cart
      createCart(formData)
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

          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={
              isPendingCreateCart ||
              isPendingAddCartItem ||
              isPendingUpdateCartItem
            }
          >
            Add to cart
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}
