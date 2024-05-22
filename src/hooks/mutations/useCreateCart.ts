import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useCreateCart = (options: UseMutationOptions) => {
  const queryClient = useQueryClient()

  const createCart = async (formData: DesignFormInputs) => {
    const res = await fetch("/api/v1/cart", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    console.log({ res, body: res.body })

    const { cart } = await res.json()

    return cart
  }

  const onSuccess = (data: any) => {
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })

    if (options.onSuccess) {
      options.onSuccess(data, undefined, undefined)
    }
  }

  return useMutation({ mutationFn: createCart, onSuccess })
}
