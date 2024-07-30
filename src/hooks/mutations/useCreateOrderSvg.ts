import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query"

export const useCreateOrderSvg = (options?: UseMutationOptions) => {
  const createOrderSvg = async (body: any) => {
    await fetch(`/api/v1/admin/svg`, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  const onSuccess = () => {
    if (options?.onSuccess) {
      options.onSuccess(undefined, undefined, undefined)
    }
  }

  return useMutation({ mutationFn: createOrderSvg, onSuccess })
}
