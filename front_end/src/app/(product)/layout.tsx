import { Container } from "@mui/material"
import React from "react"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import Footer from "../_component/Footer"

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
      <Footer />
    </Container>
  )
}

export default ProductLayout
