import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { VercelProduct } from "@/src/lib/bigcommerce/types"

export const getMerchandiseId = (
  data: DesignFormInputs,
  product: VercelProduct,
) => {
  return product.variants.find((variant) => {
    return variant.selectedOptions.every((option) => {
      return data[option.name] === option.value
    })
  })?.id
}
