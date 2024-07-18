import { UpdateOrderData } from "@/src/hooks/mutations/useUpdateOrder"
import {
  OrderStatus,
  STATUS_ID_MAP,
} from "@/src/lib/bigcommerce/types"

export async function PUT(
  request: Request,
  { params }: { params: { orderId: string } },
) {
  const body: UpdateOrderData = await request.json()
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/${params.orderId}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-Auth-Token": process.env.ORDERS_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        status_id: STATUS_ID_MAP[body.status as OrderStatus],
      }),
    },
  )
  const order = await res.json()

  return Response.json({ order })
}
