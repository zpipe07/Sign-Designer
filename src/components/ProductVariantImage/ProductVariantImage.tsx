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

  if (variantData?.variant.image_url) {
    return (
      <Image
        src={variantData.variant.image_url}
        alt=""
        style={{
          width: "100%",
          height: "auto",
        }}
        width={500}
        height={300}
      />
    )
  }

  return null
}
