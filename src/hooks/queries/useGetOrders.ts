import queryString from "query-string"
import { useQuery } from "@tanstack/react-query"

import { BigCommerceOrder } from "@/src/lib/bigcommerce/types"

export const useGetOrders = ({
  page,
  statusId,
  color,
}: {
  page: number
  statusId: string | null
  color: string | null
}) => {
  const getOrders = async () => {
    const qs = queryString.stringify({
      page,
      ...(statusId && { status_id: statusId }),
      ...(color && { color }),
    })
    const res = await fetch(`/api/v1/admin/orders?${qs}`)
    const data = await res.json()

    return data
  }

  return useQuery<{ orders: BigCommerceOrder[] }>({
    queryKey: ["/api/v1/admin/orders", page, statusId, color],
    queryFn: getOrders,
  })
}
