import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const removeFromCart = async ({
    cartId,
    lineItemId,
  }: {
    cartId: string
    lineItemId: string
  }) => {
    const res = await fetch(
      `/api/v1/cart/${cartId}/items/${lineItemId}`,
      {
        method: "DELETE",
      },
    )
    const { cart } = await res.json()

    return cart
  }

  const onSuccess = (data: any) => {
    console.log({ data })
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })
  }

  return useMutation({ mutationFn: removeFromCart, onSuccess })
}
