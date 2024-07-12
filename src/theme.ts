"use client"

// import { Roboto } from "next/font/google"
import { ThemeOptions, createTheme } from "@mui/material/styles"

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// })

// const theme = createTheme({
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
// })

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
        },
        sizeLarge: {
          paddingLeft: "3rem",
          paddingRight: "3rem",
          fontSize: "1rem",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
}
const theme = createTheme(themeOptions)

export default theme
