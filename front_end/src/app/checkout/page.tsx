import React from "react"
import type { Metadata } from "next"
import Container from "@mui/material/Container"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Order from "../_component/order"

export const metadata: Metadata = {
  title: "Pay with your order",
  description: "Let's start payment"
}

const PageOrder = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <Box
        sx={{
          mt: 6
        }}
      >
        <Typography
          component={"h3"}
          sx={{
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "700",
            color: "primary.main"
          }}
        >
          Đơn hàng của bạn
        </Typography>
        <Order />
      </Box>
    </Container>
  )
}

export default PageOrder
