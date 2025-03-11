import React from "react"
import type { Metadata } from "next"
import Container from "@mui/material/Container"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Cart from "../_component/cart"

export const metadata: Metadata = {
  title: "Clean food cart",
  description: "Please continue to checkout"
}
const PageCart = () => {
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
          Giỏ hàng của bạn
        </Typography>
        <Cart />
      </Box>
    </Container>
  )
}

export default PageCart
