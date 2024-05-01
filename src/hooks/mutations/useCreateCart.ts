import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCart = () => {
  const queryClient = useQueryClient()

  const createCart = async (formData: DesignFormInputs) => {
    const res = await fetch("/api/v1/cart", {
      method: "POST",
      body: JSON.stringify(formData),
    })
    const { cart } = await res.json()

    return cart
  }

  const onSuccess = (data: any) => {
    console.log({ data })
    queryClient.setQueryData(["/api/v1/cart"], { cart: data })
  }

  return useMutation({ mutationFn: createCart, onSuccess })
}
