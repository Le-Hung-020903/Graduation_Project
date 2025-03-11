import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import React from "react"
import Grid from "@mui/material/Grid2"
import Swiper from "./SwiperProduct"
import { IProduct } from "../_interfaces/product"

const BestDeals = () => {
  const product: IProduct[] = [
    {
      id: 1,
      category: "Rau củ",
      unit: "kg",
      title: "Dưa chuột đen trắng",
      price: 15000,
      image: "/images/Icon/cucumber.png"
    },
    {
      id: 2,
      category: "Rau củ",
      unit: "Trái",
      title: "Dưa hấu",
      price: 15000,
      image: "/images/Icon/watermelon.png"
    },
    {
      id: 3,
      category: "Rau củ",
      unit: "kg",
      title: "Dâu tây",
      price: 15000,
      image: "/images/Icon/strawberry.png"
    },
    {
      id: 4,
      category: "Rau củ",
      unit: "kg",
      title: "Bí đỏ",
      price: 15000,
      image: "/images/Icon/pumpkin.png"
    }
  ]
  return (
    <Box
      sx={{
        mt: "80px"
      }}
    >
      <Typography
        color="primary.main"
        component={"h2"}
        sx={{
          fontSize: "24px",
          fontWeight: "800",
          lineHeight: "32px",
          textAlign: "center"
        }}
      >
        Ưu đãi tốt nhất trong tuần!
      </Typography>
      <Grid
        className="swiper-products"
        container
        spacing={3}
        sx={{ mt: "60px", position: "relative" }}
      >
        <Swiper data={product} />
      </Grid>
    </Box>
  )
}

export default BestDeals
