import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useUpdateCartItem = (options?: UseMutationOptions) => {
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

    return cart
  }

  const onSuccess = (data: any) => {
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })

    if (options?.onSuccess) {
      options.onSuccess(data, undefined, undefined)
    }
  }

  return useMutation({ mutationFn: updateCartItem, onSuccess })
}
