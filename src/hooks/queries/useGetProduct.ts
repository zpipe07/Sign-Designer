import { useQuery } from "@tanstack/react-query"

import { VercelProduct } from "@/src/lib/bigcommerce/types"

type ProductOptionsMap = {
  [key: string]: {
    id: string
    values: { label: string; entityId: number }[]
  }
}

const createProductOptionsMap = (product: VercelProduct) => {
  const optionsMap: ProductOptionsMap = {}

  product.options.forEach(({ id, name, values }) => {
    optionsMap[name] = { id, values }
  })

  return optionsMap
}

export const useGetProduct = (productId: number) => {
  const getProduct = async () => {
    const res = await fetch(`/api/v1/products/${productId}`)
    const data = await res.json()
    const productOptionsMap = createProductOptionsMap(data.product)

    return { product: data.product, productOptionsMap }
  }

  return useQuery<{
    product: VercelProduct
    productOptionsMap: ProductOptionsMap
  }>({
    queryKey: [`/api/v1/products/${productId}`],
    queryFn: getProduct,
  })
}
