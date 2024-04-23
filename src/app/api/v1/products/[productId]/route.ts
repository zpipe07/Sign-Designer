import { getProduct } from "@/src/lib/bigcommerce"
import { getProductFormMapping } from "@/src/lib/bigcommerce/mappers"

export async function GET(
  _request: Request,
  { params }: { params: { productId: string } },
) {
  // get a product by ID

  const product = await getProduct(params.productId)

  if (!product) {
    return { product: undefined }
  }

  const productFormMapping = getProductFormMapping(product)

  return Response.json({
    product: { ...product, formMapping: productFormMapping },
  })
}
