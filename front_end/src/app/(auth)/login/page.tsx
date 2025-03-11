import React from "react"
import type { Metadata } from "next"
import Box from "@mui/material/Box"
import LoginForm from "@/app/_component/LoginForm"

export const metadata: Metadata = {
  title: "Login and enjoy",
  description: "Clean food is always the first choice"
}
export default function PageLogin() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: 'url("/images/Icon/login-bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)"
      }}
    >
      <LoginForm />
    </Box>
  )
}
