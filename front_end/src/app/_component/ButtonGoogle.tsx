"use client"
import React from "react"
import Button from "@mui/material/Button"
import { usePathname } from "next/navigation"
import { GoogleIcon } from "../(auth)/_component/customIcon"
import { API_ROOT } from "../utils/constants"

const ButtonGoogle = () => {
  const pathname = usePathname()

  const handleClick = () => {
    window.location.href = `${API_ROOT}/auth/google/callback`
  }
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleClick}
      startIcon={<GoogleIcon />}
    >
      {pathname === "/register" ? "Sign up with Google" : "Sign in with Google"}
    </Button>
  )
}

export default ButtonGoogle
