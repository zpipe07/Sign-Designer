import { useMutation, useQueryClient } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  const updateCartItem = async ({
    cartId,
    itemId,
    formData,
  }: {
    cartId: string
    itemId: string
    formData: DesignFormInputs
  }) => {
    const res = await fetch(
      `/api/v1/cart/${cartId}/items/${itemId}`,
      {
        method: "PATCH",
        body: JSON.stringify(formData),
      },
    )
    const { cart } = await res.json()
    console.log({ cart })
    return cart
  }

  const onSuccess = (data: any) => {
    console.log({ data })
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })
  }

  return useMutation({ mutationFn: updateCartItem, onSuccess })
}
