import { useMutation, useQueryClient } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useAddCartItem = () => {
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
    console.log({ cart })
    return cart
  }

  const onSuccess = (data: any) => {
    console.log({ data })
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })
  }

  return useMutation({
    mutationFn: addCartItem,
    onSuccess,
  })
}
