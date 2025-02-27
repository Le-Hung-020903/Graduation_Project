"use client"
import React from "react"
// Import Swiper React components
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "../../../public/style/swiper.css"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { IProduct } from "../_interfaces/product"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface ISwiperProps {
  data: IProduct[]
}
const Swiper = ({ data }: ISwiperProps) => {
  return (
    <SwiperReact
      spaceBetween={30}
      watchSlidesProgress={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 1 // Ở màn hình nhỏ (xs), chỉ hiển thị 1 slide
        },
        650: {
          slidesPerView: 2 // Từ màn hình md trở lên, hiển thị 2 slide
        }
      }}
    >
      {data.map((item: IProduct, index: number) => {
        return (
          <>
            <SwiperSlide className="custom-swiper-item" key={item.id || index}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "hidden",
                  "&:hover": {
                    outline: "10px solid #EEC73E"
                  }
                }}
              >
                <CardContent sx={{ marginLeft: "57px" }}>
                  <Stack spacing={1.5}>
                    <Typography
                      component="span"
                      color="#EEC73E"
                      sx={{
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "16px"
                      }}
                    >
                      {item.category}
                    </Typography>
                    <Typography
                      component="p"
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        lineHeight: "16px"
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography
                        color="#A0A1A2"
                        sx={{
                          fontWeight: "400",
                          fontSize: "15px",
                          lineHeight: "16px"
                        }}
                      >
                        Đơn giá:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "15px",
                          lineHeight: "16px"
                        }}
                      >
                        {item.unit}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"baseline"}
                    >
                      <Typography
                        component="p"
                        color="primary.main"
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "20px"
                        }}
                      >
                        {item.price}
                        <Typography
                          component="span"
                          color="primary.main"
                          sx={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "20px"
                          }}
                        >
                          VND
                        </Typography>
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{
                          textDecoration: "line-through",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "20px",
                          color: "#A0A1A2",
                          marginTop: "2px"
                        }}
                      >
                        15000
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <Box
                  sx={{ width: "300px", height: "300px", marginRight: "38px" }}
                >
                  <CardMedia
                    component="img"
                    alt="Ảnh sản phẩm"
                    height="200"
                    image={item.image}
                    sx={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </Card>
            </SwiperSlide>
            <Box className="swiper-pagination"></Box>
          </>
        )
      })}
    </SwiperReact>
  )
}

export default Swiper
