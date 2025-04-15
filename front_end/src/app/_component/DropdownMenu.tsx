"use client"
import React, { JSX, useState } from "react"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DashboardIcon from "@mui/icons-material/Dashboard"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import SetMealIcon from "@mui/icons-material/SetMeal"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Image from "next/image"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import LocalDiningIcon from "@mui/icons-material/LocalDining"
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage"
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"
import { ICategory } from "../_interfaces/category"
import { Stack } from "@mui/material"
import Link from "next/link"
interface ICategoriesProps {
  data: ICategory[]
}
const DropdownMenu = ({ data }: ICategoriesProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Xử lý khi hover vào menu container
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Xử lý khi rời chuột khỏi toàn bộ container
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const categoryIcons: Record<string, JSX.Element> = {
    "gia-vi-sach": (
      <Image
        src="/images/Icon/salt.svg"
        width={24}
        height={24}
        alt="Gia vị sạch"
      />
    ),
    "rau-cu-qua": (
      <Image
        src="/images/Icon/vegetable.png"
        width={24}
        height={24}
        alt="Rau củ quả"
      />
    ),
    "thit-ca-hai-san": <SetMealIcon />,
    "dac-san-dia-phuong": <MilitaryTechIcon />,
    "thuc-uong-dinh-duong": <EmojiFoodBeverageIcon />,
    "san-pham-ho-tro-suc-khoe": <VolunteerActivismIcon />,
    "thuc-pham-che-bien-san-sach": <LocalDiningIcon />
  }
  return (
    <Box
      sx={{ position: "relative" }} // Đảm bảo container hoạt động đúng
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
          pt: 2,
          position: "absolute",
          left: 0,
          right: 0,
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
            bgcolor: "#EDEDED",
            borderRadius: "8px",
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
          {data?.map((item: ICategory) => {
            return (
              <ListItem
                key={item.id}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  "&:hover .sub_categories": {
                    display: "block"
                  }
                }}
              >
                {/* Link cho danh mục cha */}
                <Link
                  href={`/products/${item.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
                    {categoryIcons[item.slug]}
                  </ListItemIcon>
                  {item.name}
                  <ListItemIcon sx={{ minWidth: "unset", ml: "auto" }}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </Link>

                {/* Danh mục con (sub_categories) */}
                <Box
                  className="sub_categories"
                  sx={{
                    display: "none",
                    position: "absolute",
                    left: "100%",
                    top: 0,
                    width: "890px",
                    height: "100%",
                    bgcolor: "#EDEDED",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                    zIndex: 999,
                    padding: 2,
                    borderRadius: "6px"
                  }}
                >
                  <Stack spacing={3} direction="row" alignItems="center">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={`/products/${child.slug}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit"
                        }}
                      >
                        <Typography component="p">{child.name}</Typography>
                      </Link>
                    ))}
                  </Stack>
                </Box>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}

export default DropdownMenu
