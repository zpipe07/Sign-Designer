"use client"

import { useFormContext } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { LoadingButton } from "@mui/lab"
import { Box, Divider, useTheme } from "@mui/material"

import {
  ColorSelector,
  DecorationSelector,
  FontSelector,
  ShapeSelector,
  SizeSelector,
  TextInput,
  OrientationSelector,
} from "@/src/components/SignDesigner/SignDesignerForm"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useCreateCart } from "@/src/hooks/mutations/useCreateCart"
import { useAddCartItem } from "@/src/hooks/mutations/useAddCartItem"
import { useUpdateCartItem } from "@/src/hooks/mutations/useUpdateCartItem"
import { PriceDisplay } from "@/src/components/PriceDisplay"

type Props = {
  isEditing?: boolean
}

export const SignDesignerForm: React.FC<Props> = ({ isEditing }) => {
  const router = useRouter()

  const theme = useTheme()

  const params = useParams<{ cartId: string; itemId: string }>()

  const { handleSubmit } = useFormContext()

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

  const onSubmit = (data: DesignFormInputs) => {
    // if (isEditing) {
    //   router.push(
    //     `/cart/${params.cartId}/items/${params.itemId}/configure`,
    //   )
    //   return
    // }

    // router.push("/design/configure")
    if (isEditing) {
      // update cart item
      updateCartItem({
        cartId: params.cartId,
        itemId: params.itemId,
        formData: data,
      })

      return
    }

    if (data?.cart) {
      // update cart
      addCartItem({ cartId: data.cart.id, formData: data })
    } else {
      // create new cart
      createCart(data)
    }
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

        <Grid item xs={12}>
          <Divider
            aria-hidden="true"
            sx={{
              borderColor: theme.palette.primary.main,
              width: "100%",
              marginTop: 2,
              marginBottom: 2,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          {/* <Button variant="outlined" size="large">
            Save
          </Button> */}

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <PriceDisplay />

            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
              loading={
                isPendingCreateCart ||
                isPendingAddCartItem ||
                isPendingUpdateCartItem
              }
              sx={{ marginLeft: 2 }}
            >
              Add to cart
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
