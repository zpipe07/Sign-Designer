import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useCreateOrderSvg = (options?: UseMutationOptions) => {
  const createOrderSvg = async (
    body: DesignFormInputs & { orderId: number; productId: number },
  ) => {
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
