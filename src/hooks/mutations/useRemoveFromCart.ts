import { VercelCart } from "@/src/lib/bigcommerce/types"
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
    // const { cart } = await res.json()

    return lineItemId
  }

  const onSuccess = (lineItemId: string) => {
    const data = queryClient.getQueryData<{
      cart: VercelCart | undefined
    }>(["/api/v1/cart"])
    const updatedLines = data?.cart?.lines.filter(
      ({ id }) => id !== lineItemId,
    )
    const updatedAmount = updatedLines?.reduce(
      (acc, { cost, quantity }) =>
        acc + parseFloat(cost.totalAmount.amount) * quantity,
      0,
    )
    const updatedCost = {
      ...data?.cart?.cost,
      subtotalAmount: {
        ...data?.cart?.cost?.subtotalAmount,
        amount: updatedAmount?.toString(),
      },
    }
    const updatedCart = updatedLines?.length
      ? { ...data?.cart, lines: updatedLines, cost: updatedCost }
      : undefined

    queryClient.setQueryData(["/api/v1/cart"], {
      cart: updatedCart,
    })
  }

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess,
  })
}
