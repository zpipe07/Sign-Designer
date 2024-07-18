import { Box } from "@mui/material"

import { ColorFilterSelector } from "@/src/components/Orders/OrderDetailsRow/ColorFilterSelector"
import { StatusFilterSelector } from "@/src/components/Orders/StatusFilterSelector"

export const OrdersFilters: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: "1 1 50%", marginRight: 2 }}>
        <StatusFilterSelector />
      </Box>

      <Box sx={{ flex: "1 1 50%" }}>
        <ColorFilterSelector />
      </Box>
    </Box>
  )
}
