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
  },
}
const theme = createTheme(themeOptions)

export default theme
