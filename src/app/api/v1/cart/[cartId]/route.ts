import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { getCartQuery } from "@/src/lib/bigcommerce/queries/cart"
import { BigCommerceCartOperation } from "@/src/lib/bigcommerce/types"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } },
) {
  // get cart
  const res = await bigCommerceFetch<BigCommerceCartOperation>({
    query: getCartQuery,
    variables: { entityId: params.cartId },
    cache: "no-store",
  })

  return Response.json(res)
}
