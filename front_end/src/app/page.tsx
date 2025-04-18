import * as React from "react"
import Container from "@mui/material/Container"
import ModeSwitch from "./_component/ModeSwitch"
import Slider from "./_component/Slider"
import Discount from "./_component/Discount"
import TopProduct from "./_component/TopProduct"
import CookingInstructions from "./_component/CookingInstructions"
import BestSeller from "./_component/BestSeller"
import BestDeals from "./_component/BestDeals"
import Comments from "./_component/Comments"
import Footer from "./_component/Footer"
import Header from "./_component/Header"
import NavigationBar from "./_component/NavigationBar"

const page = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <Slider />
      <Discount />
      <TopProduct />
      <CookingInstructions />
      <BestSeller />
      {/* <BestDeals /> */}
      {/* <Comments /> */}
      <Footer />
    </Container>
  )
}

export default page
