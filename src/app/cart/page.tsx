import { Typography } from "@mui/material"

import { Cart } from "@/src/components/Cart"

export default function Page() {
  return (
    <>
      <Typography variant="h3" component="h1">
        Your cart
      </Typography>

      <Cart />
    </>
  )
}
