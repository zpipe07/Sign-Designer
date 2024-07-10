import { UpdateOrderData } from "@/src/hooks/mutations/useUpdateOrder"
import { OrderStatus } from "@/src/lib/bigcommerce/types"

const STATUS_ID_MAP: { [key in OrderStatus]: number } = {
  Incomplete: 0,
  Pending: 1,
  Shipped: 2,
  "Partially Shipped": 3,
  Refunded: 4,
  Cancelled: 5,
  Declined: 6,
  "Awaiting Payment": 7,
  "Awaiting Pickup": 8,
  "Awaiting Shipment": 9,
  Completed: 10,
  "Awaiting Fulfillment": 11,
  "Manual Verification Required": 12,
  Disputed: 13,
  "Partially Refunded": 14,
}

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
