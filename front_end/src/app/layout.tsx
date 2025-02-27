import * as React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import theme from "@/theme"
import Header from "./_component/Header"
import Footer from "./_component/Footer"
import Container from "@mui/material/Container"

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Website Clean Food",
  description: "Clean food is always the first choice"
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
            <Container maxWidth="xl">
              <Header />
              {children}
              {/* <Footer /> */}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
