import RegisterForm from "@/app/_component/RegisterForm"
import Box from "@mui/material/Box"
import React from "react"

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
