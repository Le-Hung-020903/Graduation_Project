import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import PhonePausedIcon from "@mui/icons-material/PhonePaused"
import React from "react"
import DropdownMenu from "./DropdownMenu"

const NavigationBar = () => {
  const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  return (
    <Box
      sx={{
        ...flexCenter,
        justifyContent: "space-between",
        mt: "10px"
      }}
    >
      <DropdownMenu />
      <Box sx={{ ml: "36px" }}>
        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            alignItems: "center",
            "& .MuiListItem-root": {
              width: "130px",
              cursor: "pointer",
              color: "#757577",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "primary.main" // Đổi màu chữ khi hover
              },
              "&:hover::after": {
                transform: "scaleX(1)" // Hiển thị dòng chạy qua khi hover
              },
              "&::after": {
                content: '""', // Tạo dòng bên dưới
                position: "absolute",
                bottom: "-4px", // Cách chữ 4px
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "primary.main", // Màu của dòng
                transform: "scaleX(0)", // Ban đầu dòng ẩn
                transformOrigin: "left", // Hiệu ứng bắt đầu từ trái qua phải
                transition: "transform 0.3s ease" // Hiệu ứng mượt
              }
            }
          }}
        >
          <ListItem>Trang chủ</ListItem>
          <ListItem>Khuyến mãi</ListItem>
          <ListItem>Về chúng tôi</ListItem>
          <ListItem>Liên hệ</ListItem>
          <ListItem>Bài viết</ListItem>
        </List>
      </Box>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}
      >
        <PhonePausedIcon sx={{ color: "primary.main" }} />
        <Typography component="span" color="#757577">
          0912 345 678
        </Typography>
      </Box>
    </Box>
  )
}

export default NavigationBar
