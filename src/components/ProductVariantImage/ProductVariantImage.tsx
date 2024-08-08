import Image from "next/image"
import { useWatch } from "react-hook-form"
import { useTheme } from "@mui/material"
import Box from "@mui/material/Box"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { useGetProductVariant } from "@/src/hooks/queries/useGetProductVariant"
import { getProductVariant } from "@/src/lib/bigcommerce/utils"

export const ProductVariantImage: React.FC = () => {
  const theme = useTheme()

  const { data: productData } = useGetProduct(112)

  const inputs = useWatch() as DesignFormInputs

  const variant = getProductVariant(inputs, productData?.product)

  const { data: variantData } = useGetProductVariant(112, variant?.id)

  if (variantData?.variant?.image_url) {
    return (
      <Box
        sx={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          maxHeight: 300,

          [theme.breakpoints.up("sm")]: {
            maxHeight: 400,
          },

          [theme.breakpoints.up("md")]: {
            maxHeight: 500,
          },
        }}
      >
        <Image
          src={variantData.variant.image_url}
          alt=""
          style={{
            width: "auto",
          }}
          width={500}
          height={300}
        />
      </Box>
    )
  }

  return null
}
