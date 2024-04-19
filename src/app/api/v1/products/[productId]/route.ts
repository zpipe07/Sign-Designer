import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { getProductQuery } from "@/src/lib/bigcommerce/queries/product"
import { BigCommerceProductOperation } from "@/src/lib/bigcommerce/types"

export async function GET(
  _request: Request,
  { params }: { params: { productId: string } },
) {
  // get a product by ID
  const res = await bigCommerceFetch<BigCommerceProductOperation>({
    query: getProductQuery,
    variables: {
      productId: parseInt(params.productId, 10),
    },
  })

  return Response.json(res.body.data.site.product)
}
