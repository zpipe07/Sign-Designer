import { useQuery } from "@tanstack/react-query"
import queryString from "query-string"

export const useGetOrderCount = ({
  statusId,
}: {
  statusId: string | null
}) => {
  const getOrderCount = async () => {
    const qs = queryString.stringify({
      ...(statusId && { status_id: statusId }),
    })
    const res = await fetch(`/api/v1/admin/orders/count?${qs}`)
    const data = await res.json()

    return data
  }

  return useQuery({
    queryKey: ["/api/v1/admin/orders/count", statusId],
    queryFn: getOrderCount,
  })
}
