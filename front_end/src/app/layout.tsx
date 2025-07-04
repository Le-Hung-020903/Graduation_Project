import * as React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import theme from "@/theme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Providers from "@/providers/Providers"

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Website Thực Phẩm Sạch",
  description: "Thực phẩm sạch luôn là sự lựa chọn hàng đầu của mỗi gia đình"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>{children}</Providers>
            <ToastContainer position="top-right" theme="colored" />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
