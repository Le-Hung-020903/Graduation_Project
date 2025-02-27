"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "../../../public/style/swiper.css"

// import required modules
import { Navigation, Autoplay } from "swiper/modules"

import Box from "@mui/material/Box"
import React, { useRef, useState } from "react"
import { IComments } from "../_interfaces/comment"
import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

interface ISwiperCommentsProps {
  data: IComments[]
}
function SwiperComemt({ data }: ISwiperCommentsProps) {
  const [slideBegorNot, handleSlideByState] = useState({
    isFirst: true,
    isLast: false
  })
  const slideRef = useRef<null>(null)

  const handleNext = () => {
    slideRef.current?.swiper?.slideNext()
  }

  const handlePrev = () => {
    slideRef.current?.swiper?.slidePrev()
  }

  const onSlideChange = (swiper) => {
    handleSlideByState({
      isFirst: swiper.isBeginning,
      isLast: swiper.isEnd
    })
  }

  const { isLast, isFirst } = slideBegorNot
  return (
    // <Box className="wrapper-comments">
    //   <Box className="swiper-comments">
    <>
      <Swiper
        navigation={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        modules={[Navigation, Autoplay]}
        ref={slideRef}
        onSlideChange={onSlideChange}
        className="mySwiper"
      >
        {data.map((item: IComments, index: number) => {
          return (
            <SwiperSlide key={item.id || index}>
              <Box sx={{ textAlign: "center" }}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "12px 12px 30px 12px",
                      overflow: "hidden"
                    }}
                  >
                    <Image
                      src={item.avatar}
                      width={0}
                      height={0}
                      alt="avatar"
                      className="avatar"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                </Stack>
                <Typography sx={{ my: "28px" }}>{item.content}</Typography>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiSvgIcon-root": {
                      width: "16px",
                      height: "16px",
                      color: "yellow"
                    }
                  }}
                >
                  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Stack>
                <Typography
                  sx={{
                    mt: "10px",
                    color: "primary.main",
                    fontWeight: "600",
                    fontSize: "12px"
                  }}
                >
                  {item.user}
                </Typography>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Box>
        <Box
          className={`custom-swiper-button-prev ${isFirst ? "disabled" : ""}`}
          onClick={handlePrev}
        >
          <ArrowBackIcon />
        </Box>
        <Box
          className={`custom-swiper-button-next ${isLast ? "disabled" : ""}`}
          onClick={handleNext}
        >
          <ArrowForwardIcon />
        </Box>
      </Box>
    </>
    //   </Box>
    // </Box>
  )
}

export default SwiperComemt
