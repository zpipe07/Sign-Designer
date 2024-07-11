import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useAddCartItem = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()

  const addCartItem = async ({
    cartId,
    formData,
  }: {
    cartId: string
    formData: DesignFormInputs
  }) => {
    const res = await fetch(`/api/v1/cart/${cartId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    })
    const { cart } = await res.json()

    return cart
  }

  const onSuccess = (data: any) => {
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })

    if (options?.onSuccess) {
      options.onSuccess(data, undefined, undefined)
    }
  }

  return useMutation({
    mutationFn: addCartItem,
    onSuccess,
  })
}
