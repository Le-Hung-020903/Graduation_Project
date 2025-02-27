"use client"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DashboardIcon from "@mui/icons-material/Dashboard"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import SetMealIcon from "@mui/icons-material/SetMeal"
import ListItemIcon from "@mui/material/ListItemIcon"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Image from "next/image"

const DropdownMenu = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Xử lý khi hover vào menu container
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Xử lý khi rời chuột khỏi toàn bộ container
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Box
      sx={{ position: "relative", display: "inline-block" }} // Đảm bảo container hoạt động đúng
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Box cha */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#EEC73E",
          borderRadius: "8px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          px: "17px",
          "&:hover": {
            cursor: "pointer"
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DashboardIcon
            sx={{
              mr: "8px",
              color: "white"
            }}
          />
          <Typography component="span" color="white">
            Tất cả danh mục
          </Typography>
        </Box>
        <KeyboardArrowDownIcon
          sx={{
            ml: "44px",
            color: "white"
          }}
        />
      </Box>

      {/* Menu con */}
      <Box
        sx={{
          mt: "5px",
          bgcolor: "#EDEDED",
          borderRadius: "8px",
          position: "absolute",
          top: "52px", // Đặt menu con ngay dưới menu cha
          left: "0",
          opacity: isHovered ? 1 : 0, // Điều khiển độ mờ
          transform: isHovered ? "scale(1)" : "scale(0.95)", // Hiệu ứng thu phóng
          transition: "opacity 0.3s ease, transform 0.3s ease", // Hiệu ứng mượt mà
          pointerEvents: isHovered ? "auto" : "none", // Ngăn tương tác khi menu ẩn
          zIndex: 1,
          width: "260px" // Đảm bảo menu con có kích thước cố định
        }}
      >
        <List
          sx={{
            py: 0,
            "& .MuiListItem-root": {
              px: 1.5,
              justifyContent: "space-between",
              gap: 0,
              py: 1.5,
              color: "#757577",
              borderTop: "1px solid #E2E3E4",
              borderBottom: "1px solid #E2E3E4",
              cursor: "pointer"
            },
            "& .MuiListItem-root:hover": {
              color: "primary.main"
            },
            "& .MuiListItem-root:hover img": {
              color: "primary.main"
            },
            "& .MuiListItem-root:hover .MuiSvgIcon-root": {
              color: "primary.main"
            },
            "& .MuiListItem-root:first-of-type": {
              borderTop: "none"
            },
            "& .MuiListItem-root:last-of-type": {
              borderBottom: "none"
            }
          }}
        >
          <ListItem>
            <Image
              src="/images/Icon/salt.svg"
              width={24}
              height={24}
              alt="Tra cứu đơn hàng"
              style={{ marginRight: "10px" }}
            />
            Gia vị sạch
            <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <Image
              src="/images/Icon/vegetable.png"
              width={24}
              height={24}
              alt="Tra cứu đơn hàng"
              style={{ marginRight: "12px" }}
            />
            Rau - Củ - Quả
            <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem>Gói sản phẩm combo</ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
              <SetMealIcon />
            </ListItemIcon>
            Thịt - Cá - Hải sản
            <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem>Đặc sản địa phương</ListItem>
          <ListItem>
            <Image
              src="/images/Icon/drink.svg"
              width={24}
              height={24}
              alt="Tra cứu đơn hàng"
              style={{ marginRight: "10px" }}
            />
            Thức uống dinh dưỡng
            <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem>Ngũ cốc và hạt dinh dưỡng</ListItem>
          <ListItem>Sản phẩm hỗ trợ sức khoẻ</ListItem>
          <ListItem>
            <Image
              src="/images/Icon/fork-knife.svg"
              width={24}
              height={24}
              alt="Tra cứu đơn hàng"
              style={{ marginRight: "10px" }}
            />
            Chế biến sẵn (sạch)
            <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default DropdownMenu
