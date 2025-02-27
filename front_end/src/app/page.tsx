import * as React from "react"
import Container from "@mui/material/Container"
import ModeSwitch from "./_component/ModeSwitch"
import NavigationBar from "./_component/NavigationBar"
import Slider from "./_component/Slider"
import Discount from "./_component/Discount"
import TopProduct from "./_component/TopProduct"
import CookingInstructions from "./_component/CookingInstructions"
import BestSeller from "./_component/BestSeller"
import BestDeals from "./_component/BestDeals"
import Comments from "./_component/Comments"
import Footer from "./_component/Footer"

const page = () => {
  return (
    // <Container maxWidth="xl">
    <>
      <NavigationBar />
      <Slider />
      <Discount />
      <TopProduct />
      <CookingInstructions />
      <BestSeller />
      <BestDeals />
      <Comments />
      <Footer />
    </>
    // </Container>
  )
}

export default page
