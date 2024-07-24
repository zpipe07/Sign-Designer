"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
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
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import { useTheme } from "@mui/material"

import { SignOut } from "@/src/components/Header/SignOut"
import { Cart } from "@/src/components/Header/Cart"

const pages = [
  { label: "Sign Designer", href: "/design" },
  { label: "Our Work", href: "/our-work" },
  // { label: "About Us", href: "/about-us" },
  // { label: "Contact Us", href: "/contact-us" },
  { label: "FAQs", href: "/faqs" },
]

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
        // backgroundColor: theme.palette.background.default,
        backgroundColor: "pink",
        boxShadow: "0 4px 15px 6px rgba(165, 165, 165, 0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="body1"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              fontSize: 26,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sign Genie
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Image
              src="/images/logos/LogoMarkBlue.png"
              alt=""
              width={697 / 6}
              height={446 / 6}
            />
          </Box>

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
                display: { xs: "block", md: "none", zIndex: 99999 },
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

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Image
              src="/images/logos/LogoMarkBlue.png"
              alt=""
              width={697 / 7}
              height={446 / 7}
            />
          </Box>
          <Typography
            variant="body1"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: 24,
            }}
          >
            Sign Genie
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
                sx={{
                  fontSize: 18,
                  padding: 2,
                  borderRadius: 0,
                  color: "inherit",
                  display: "block",
                  textTransform: "none",
                }}
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
