import { useWatch } from "react-hook-form"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { useGetProduct } from "@/src/hooks/queries/useGetProduct"
import { PriceDisplayView } from "@/src/components/PriceDisplay/PriceDisplayView"
import { getMerchandiseId } from "@/src/lib/bigcommerce/utils"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const PriceDisplay: React.FC = () => {
  const { data, isLoading } = useGetProduct(112)

  const inputs = useWatch() as DesignFormInputs

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return null
  }

  const merchandiseId = getMerchandiseId(inputs, data.product)
  const variant = data.product.variants.find(
    (variant) => variant.id === merchandiseId,
  )

  if (!variant) {
    return null
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          minHeight: 250,
        }}
      >
        <PriceDisplayView variant={variant} />
      </Box>
    </Box>
  )
}
