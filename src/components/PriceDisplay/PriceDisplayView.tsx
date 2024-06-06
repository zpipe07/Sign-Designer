import Typography from "@mui/material/Typography"

import { VercelProductVariant } from "@/src/lib/bigcommerce/types"

type Props = {
  variant: VercelProductVariant
}

export const PriceDisplayView: React.FC<Props> = ({ variant }) => {
  return (
    <Typography variant="h5">
      ${parseInt(variant.price.amount, 10).toFixed(2)}
    </Typography>
  )
}
