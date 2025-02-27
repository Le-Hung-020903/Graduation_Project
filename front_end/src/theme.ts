"use client"
import { createTheme } from "@mui/material/styles"
import { Inter } from "next/font/google"
const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap"
})

const theme = createTheme({
  // palette: {
  //   text: {
  //     primary: "#757577",
  //     secondary: "#E0E0E0"
  //   }
  // },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#128447"
        },
        background: {
          default: "#ffffff"
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: "#03C55E"
        },
        background: {
          default: "#181818"
        }
      }
    }
  },
  cssVariables: {
    colorSchemeSelector: "class"
  },
  typography: {
    fontFamily: inter.style.fontFamily
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa"
              }
            }
          ]
        }
      }
    }
  }
})

export default theme
