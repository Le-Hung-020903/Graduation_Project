"use client"
import React from "react"
import { usePathname } from "next/navigation"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import HistoryIcon from "@mui/icons-material/History"
import PersonIcon from "@mui/icons-material/Person"
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import RateReviewIcon from "@mui/icons-material/RateReview"
import Box from "@mui/material/Box"
import Link from "next/link"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { logoutUserAPI } from "../api/apiwithclient"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { clearUser } from "@/redux/slice/userSlice"

const activeStyle = {
  borderRadius: "8px",
  border: "1px solid #016433",
  backgroundColor: "#BAFFDD",
  color: "#016433"
}

const MenuProfile = () => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  // Kiểm tra đường dẫn hiện tại để xác định mục nào đang active
  const isActive = (path: string) => {
    // Nếu là trang root ("/") hoặc bắt đầu với "/smember"
    if (path === "/smember") {
      return pathname === "/" || pathname.endsWith("/smember")
    }
    return pathname.endsWith(path)
  }

  // Danh sách các mục menu
  const menuItems = [
    {
      path: "/member",
      icon: <HomeIcon />,
      text: "Trang chủ"
    },
    {
      path: "/member/history",
      icon: <HistoryIcon />,
      text: "Lịch sử mua hàng"
    },
    {
      path: "/member/account",
      icon: <PersonIcon />,
      text: "Tài khoản của bạn"
    },
    {
      path: "/support",
      icon: <PhoneForwardedIcon />,
      text: "Hỗ trợ"
    },
    {
      path: "/feedback",
      icon: <RateReviewIcon />,
      text: "Góp ý - Phản hồi"
    },
    {
      path: "/logout",
      icon: <ExitToAppIcon />,
      text: "Thoát tài khoản"
    }
  ]
  const handleLogout = async () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không ???")) {
      toast.promise(logoutUserAPI(), {}).then((res) => {
        if (res.message === "Đăng xuất thành công" && res.success) {
          router.push("/login")
          dispatch(clearUser())
        }
      })
    }
  }
  return (
    <Box
      sx={{
        bgcolor: "#f1fff9",
        padding: "10px",
        borderRadius: "5px",
        height: "100vh"
      }}
    >
      <List
        sx={{
          "& .MuiListItem-root": {
            whiteSpace: "nowrap",
            cursor: "pointer",
            marginBottom: "4px"
          }
        }}
      >
        {menuItems.map((item) => {
          const isLogout = item.path === "/logout"

          return (
            <ListItem
              key={item.path}
              sx={isActive(item.path) ? activeStyle : {}}
              onClick={() => {
                if (isLogout) {
                  handleLogout() // gọi hàm logout
                }
              }}
            >
              {isLogout ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    alignItems: "center"
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </Box>
              ) : (
                <Link
                  href={item.path}
                  style={{
                    display: "flex",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    alignItems: "center"
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </Link>
              )}
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default MenuProfile
