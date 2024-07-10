import { OrderStatus } from "@/src/lib/bigcommerce/types"

export const BIGCOMMERCE_API_URL =
  process.env.BIGCOMMERCE_API_URL ?? "https://api.bigcommerce.com"
export const BIGCOMMERCE_CANONICAL_STORE_DOMAIN =
  process.env.BIGCOMMERCE_CANONICAL_STORE_DOMAIN ??
  "mybigcommerce.com"
export const BIGCOMMERCE_GRAPHQL_API_ENDPOINT = `${BIGCOMMERCE_CANONICAL_STORE_DOMAIN}/graphql`

export const orderStatuses: OrderStatus[] = [
  "Incomplete",
  "Pending",
  "Shipped",
  "Partially Shipped",
  "Refunded",
  "Cancelled",
  "Declined",
  "Awaiting Payment",
  "Awaiting Pickup",
  "Awaiting Shipment",
  "Completed",
  "Awaiting Fulfillment",
  "Manual Verification Required",
  "Disputed",
  "Partially Refunded",
]
