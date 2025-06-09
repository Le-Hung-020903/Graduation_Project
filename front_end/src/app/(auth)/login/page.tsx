import React from "react"
import type { Metadata } from "next"
import Box from "@mui/material/Box"
import LoginForm from "@/app/_component/LoginForm"

export const metadata: Metadata = {
  title: "Đăng nhập và trải nghiệm",
  description: "Thực phẩm sạch luôn là sự lựa chọn hàng đầu"
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
