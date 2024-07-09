import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { OrderStatus } from "@/src/app/api/v1/admin/orders/[orderId]/route"

export type UpdateOrderData = { status: OrderStatus }

export const useUpdateOrder = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()

  const updateOrder = async ({
    orderId,
    updateData,
  }: {
    orderId: string
    updateData: UpdateOrderData
  }) => {
    const res = await fetch(`/api/v1/admin/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })
    const { order } = await res.json()

    return order
  }

  const onSuccess = (data: any) => {
    // queryClient.setQueryData(["/api/v1/admin/orders"], {
    //   order: data,
    // })

    if (options?.onSuccess) {
      options.onSuccess(data, undefined, undefined)
    }
  }

  return useMutation({ mutationFn: updateOrder, onSuccess })
}
