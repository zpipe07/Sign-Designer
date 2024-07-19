import Image from "next/image"
import { useWatch } from "react-hook-form"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { useGetProductVariant } from "@/src/hooks/queries/useGetProductVariant"
import { getProductVariant } from "@/src/lib/bigcommerce/utils"

export const ProductVariantImage: React.FC = () => {
  const { data: productData } = useGetProduct(112)

  const inputs = useWatch() as DesignFormInputs

  const variant = getProductVariant(inputs, productData?.product)

  const { data: variantData } = useGetProductVariant(112, variant?.id)

  return null
  // if (variantData?.productVariant.)
  // <Image
  // // key={index}
  // // src={image.url}
  // // alt={image.altText}
  // // width={image.width}
  // // height={image.height}
  // />
}
