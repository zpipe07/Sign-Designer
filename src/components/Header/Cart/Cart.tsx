import Box from "@mui/material/Box"

import { useGetCart } from "@/src/hooks/queries/useGetCart"

export const Cart: React.FC = () => {
  const { data, isLoading } = useGetCart(
    "0a98b86b-2d20-4610-a160-d1366fffd65a",
  )
  console.log({ data, isLoading })

  if (isLoading) {
    return null
  }

  return (
    <Box>
      Cart: {data.body.data.site.cart.lineItems.totalQuantity} Item(s)
    </Box>
  )
}
