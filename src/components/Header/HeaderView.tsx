"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import MuiLink from "@mui/material/Link"
import { useTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

import { Cart } from "@/src/components/Header/Cart"

const pages = [
  { label: "Create Your Sign", href: "/design" },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  // { label: "FAQs", href: "/faqs" },
]

type Props = {
  user: User | null
}

export const HeaderView: React.FC<Props> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const theme = useTheme()

  return (
    <>
      <Box component="header" sx={{ py: 2 }}>
        <Container sx={{ position: "relative", textAlign: "center" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: theme.spacing(1),
              transform: "translateY(-50%)",

              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
          >
            <IconButton onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
          </Box>

          <MuiLink
            component={Link}
            href="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",

              [theme.breakpoints.up("md")]: {
                flexDirection: "column-reverse",
              },
            }}
          >
            <Image
              src="/images/logos/LogoTextBlue.png"
              alt="Sign Genie"
              width={851 / 5}
              height={188 / 5}
              style={{
                padding: 4,
              }}
            />
            <Image
              src="/images/logos/LogoMarkBlue.png"
              alt=""
              width={540 / 6}
              height={289 / 6}
              style={{
                padding: 4,
              }}
            />
          </MuiLink>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: theme.spacing(1),
              transform: "translateY(-50%)",

              [theme.breakpoints.down("md")]: {
                right: theme.spacing(2),
              },
            }}
          >
            <Cart />
          </Box>
        </Container>
      </Box>

      <Box
        component="nav"
        sx={{
          backgroundColor: grey[900],

          [theme.breakpoints.down("sm")]: {
            display: isMenuOpen ? "block" : "none",
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 9999,
          },
        }}
      >
        <Box
          component="ul"
          sx={{
            margin: 0,
            padding: 0,
            listStyle: "none",

            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {pages.map(({ label, href }) => (
            <Box
              component="li"
              key={label}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",

                  [theme.breakpoints.up("sm")]: {
                    borderBottom: "none",
                    borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                },
              }}
            >
              <Button
                component={Link}
                href={href}
                sx={{
                  display: "block",
                  color: theme.palette.common.white,
                  py: 2,
                  px: 2,

                  [theme.breakpoints.up("md")]: {
                    px: 4,
                  },
                }}
              >
                {label}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
