import { useState } from "react"
import Link from "next/link"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Badge from "@mui/material/Badge"

import { VercelCart } from "@/src/lib/bigcommerce/types"
import { CartItemsList } from "@/src/components/Header/Cart/CartItemsList"

type Props = {
  cart?: VercelCart
}

export const CartView: React.FC<Props> = ({ cart }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isCartEmpty = !cart || cart.totalQuantity === 0

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Typography variant="subtitle1">
            {cart?.totalQuantity}
          </Typography>
        }
      >
        <IconButton
          // aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ShoppingCartIcon color="action" />
        </IconButton>
      </Badge>

      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
        sx={{ zIndex: 99999 }}
        keepMounted
      >
        <Box padding={2} sx={{ minWidth: 300 }}>
          <Typography variant="subtitle1">Shopping Cart</Typography>

          {isCartEmpty ? (
            <>
              <Typography>Your cart is empty</Typography>
            </>
          ) : (
            <>
              <Typography>Items: {cart.totalQuantity}</Typography>
              <CartItemsList cart={cart} />

              <Button
                component={Link}
                href="/cart"
                variant="contained"
                fullWidth
                onClick={handleClose}
              >
                View cart
              </Button>
            </>
          )}
        </Box>
      </Menu>
    </>
  )
}
