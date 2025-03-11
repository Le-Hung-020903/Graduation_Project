import { Container } from "@mui/material"
import React from "react"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"

const ProductLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      {children}
    </Container>
  )
}

export default ProductLayout
