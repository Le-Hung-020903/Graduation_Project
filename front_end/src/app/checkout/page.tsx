import React from "react"
import type { Metadata } from "next"
import Container from "@mui/material/Container"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import Box from "@mui/material/Box"
import Order from "../_component/order"
import Footer from "../_component/Footer"

export const metadata: Metadata = {
  title: "Pay with your order",
  description: "Let's start payment"
}

const PageOrder = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <Box>
        <Order />
      </Box>
      <Footer />
    </Container>
  )
}

export default PageOrder
