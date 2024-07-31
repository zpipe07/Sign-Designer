"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useParams } from "next/navigation"
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import useTheme from "@mui/material/styles/useTheme"
import { LoadingButton } from "@mui/lab"

import {
  ColorSelector,
  FontSelector,
  ShapeSelector,
  SizeSelector,
  TextInput,
} from "@/src/components/SignDesigner/SignDesignerForm"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useCreateCart } from "@/src/hooks/mutations/useCreateCart"
import { useAddCartItem } from "@/src/hooks/mutations/useAddCartItem"
import { useUpdateCartItem } from "@/src/hooks/mutations/useUpdateCartItem"
import { PriceDisplay } from "@/src/components/PriceDisplay"
import { useGetCart } from "@/src/hooks/queries/useGetCart"
import { EdgeSelector } from "@/src/components/EdgeSelector"
import { BorderSelector } from "@/src/components/SignDesigner/SignDesignerForm/BorderSelector"
import { CartSuccessDialog } from "@/src/components/CartSuccessDialog"
import { MountingSelector } from "@/src/components/SignDesigner/SignDesignerForm/MountingSelector"

type Props = {
  isEditing?: boolean
}

export const SignDesignerForm: React.FC<Props> = ({ isEditing }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const theme = useTheme()

  const params = useParams<{ cartId: string; itemId: string }>()

  const { handleSubmit } = useFormContext<DesignFormInputs>()

  const { data: cartData } = useGetCart()

  const onSuccess = () => {
    setIsDialogOpen(true)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const {
    mutate: createCart,
    isPending: isPendingCreateCart,
    error: createCartError,
  } = useCreateCart({ onSuccess })

  const {
    mutate: addCartItem,
    isPending: isPendingAddCartItem,
    error: addCartItemError,
  } = useAddCartItem({ onSuccess })

  const {
    mutate: updateCartItem,
    isPending: isPendingUpdateCartItem,
    error: updateCartItemError,
  } = useUpdateCartItem({ onSuccess })

  const onSubmit = (data: DesignFormInputs) => {
    if (isEditing) {
      // update cart item
      updateCartItem({
        cartId: params.cartId,
        itemId: params.itemId,
        formData: data,
      })

      return
    }

    if (cartData?.cart) {
      // update cart
      addCartItem({ cartId: cartData.cart.id, formData: data })
    } else {
      // create new cart
      createCart(data)
    }
  }

  return (
    <>
      <CartSuccessDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
      />

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

              <Grid item xs={12}>
                <MountingSelector />
              </Grid>

              <Grid item xs={12}>
                <BorderSelector />
              </Grid>

              <Grid item xs={12}>
                <EdgeSelector />
              </Grid>
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
            {/* {isSuccess ? (
              <Box>
                <Alert severity="success" sx={{ marginBottom: 1 }}>
                  Item added to cart
                </Alert>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    component={Link}
                    href="/cart"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      flexGrow: 1,
                      margin: 1,
                    }}
                  >
                    View Cart
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={handleResetForm}
                    sx={{
                      flexGrow: 1,
                      margin: 1,
                    }}
                  >
                    Create a new sign
                  </Button>
                </Box>
              </Box>
            ) : ( */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
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
                sx={{
                  marginLeft: "auto",

                  [theme.breakpoints.up("md")]: {
                    width: "100%",
                    marginTop: 1,
                  },
                }}
              >
                {isEditing ? "Update" : "Add to cart"}
              </LoadingButton>
            </Box>
            {/* )} */}
          </Grid>
        </Grid>
      </form>

      {createCartError || addCartItemError || updateCartItemError ? (
        <Alert severity="error" sx={{ marginTop: 3 }}>
          There was an error adding the item to the cart. Please try
          again.
        </Alert>
      ) : null}
    </>
  )
}
