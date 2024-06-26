"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import Avatar from "@mui/material/Avatar"
import MenuIcon from "@mui/icons-material/Menu"
import AdbIcon from "@mui/icons-material/Adb"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"

import { SignOut } from "@/src/components/Header/SignOut"
import { Cart } from "@/src/components/Header/Cart"
import { useTheme } from "@mui/material"

const pages = [
  { label: "Design your sign", href: "/design" },
  { label: "View our work", href: "/our-work" },
  { label: "About us", href: "/about-us" },
]
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

type Props = {
  user: User | null
}

export const HeaderView: React.FC<Props> = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null,
  )
  const [anchorElUser, setAnchorElUser] =
    useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const theme = useTheme()

  return (
    <AppBar
      position="static"
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        boxShadow: "0 4px 15px 6px rgba(165, 165, 165, 0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sign Designer
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, href }) => (
                // @ts-ignore
                <MenuItem
                  key={label}
                  component={Link}
                  href={href}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sign Designer
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map(({ label, href }) => (
              <Button
                component={Link}
                href={href}
                key={label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Cart />

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <SignOut />
                </Menu>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
