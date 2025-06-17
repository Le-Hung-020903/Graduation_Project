import React from "react"
import type { Metadata } from "next"
import Container from "@mui/material/Container"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import Cart from "../_component/cart"
import Footer from "../_component/Footer"

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Hãy tiếp tục để thannh toán nha"
}
const PageCart = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <Cart />
      <Footer />
    </Container>
  )
}

export default PageCart
