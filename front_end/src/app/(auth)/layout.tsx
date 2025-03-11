import Box from "@mui/material/Box"
import React from "react"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <Box>{children}</Box>
}
