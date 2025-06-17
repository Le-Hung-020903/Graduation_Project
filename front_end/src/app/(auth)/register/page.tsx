import RegisterForm from "@/app/_component/RegisterForm"
import Box from "@mui/material/Box"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Đăng ký và trải nghiệm",
  description: "Thực phẩm sạch luôn là sự lựa chọn hàng đầu"
}
const PageRegister = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: 'url("/images/Icon/register-bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)"
      }}
    >
      <RegisterForm />
    </Box>
  )
}

export default PageRegister
