"use client"

import { ThemeOptions, createTheme } from "@mui/material/styles"
import { DM_Sans, DM_Serif_Display } from "next/font/google"

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
})

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#307FA3",
      light: "#9ED9DA",
    },
    secondary: {
      main: "#EE2544",
    },
    background: {
      default: "#F3F8EE",
    },
    info: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 500,
          fontWeight: 600,
          borderWidth: 2,

          "&:hover": {
            borderWidth: 2,
          },
        },
        sizeLarge: {
          paddingLeft: "3rem",
          paddingRight: "3rem",
          fontSize: "1rem",
        },
        outlined: {
          borderColor: "inherit",

          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 9999999,
        },
      },
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
    h1: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
    h2: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
    h3: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
    h4: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
    h5: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
    h6: {
      fontFamily: dmSerifDisplay.style.fontFamily,
    },
  },
}
const theme = createTheme(themeOptions)

export default theme
