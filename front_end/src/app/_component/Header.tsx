import * as React from "react"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Badge from "@mui/material/Badge"
import Image from "next/image"
import AutoCompleteSearch from "./AutoCompleteSearch"
import Typography from "@mui/material/Typography"
const Header = () => {
  const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  return (
    <Box>
      <Box
        sx={{
          ...flexCenter,
          justifyContent: "space-between",
          py: 1.5
        }}
      >
        <Box>
          <Image
            src="/images/Icon/Logo.png"
            width={100}
            height={32}
            alt="Logo website clean food"
          />
        </Box>
        <AutoCompleteSearch />
        <Box
          sx={{
            ...flexCenter,
            gap: 2
          }}
        >
          <Box
            sx={{
              ...flexCenter,
              gap: "4px",
              cursor: "pointer"
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                bgcolor: "#EAF1EE",
                ...flexCenter,
                transition: "border-radius 0.3s ease",
                borderRadius: "8px 8px 20px 8px",
                "&:hover": {
                  borderBottomRightRadius: "8px"
                }
              }}
            >
              <Image
                src="/images/Icon/truck.png"
                width={20}
                height={20}
                alt="Tra cứu đơn hàng"
              />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: "16px",
                color: "#757577"
              }}
            >
              Tra cứu đơn hàng
            </Typography>
          </Box>

          <Box sx={{ ...flexCenter, gap: "4px", cursor: "pointer" }}>
            <Badge badgeContent={4} color="primary">
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "#EAF1EE",
                  ...flexCenter,
                  borderRadius: "8px 8px 20px 8px",
                  transition: "border-radius 0.3s ease",
                  "&:hover": {
                    borderBottomRightRadius: "8px"
                  }
                }}
              >
                <Image
                  src="/images/Icon/shopping-cart.png"
                  width={20}
                  height={20}
                  alt="Tra cứu đơn hàng"
                />
              </Box>
            </Badge>

            <Typography
              component="span"
              sx={{
                fontSize: "16px",
                color: "#757577"
              }}
            >
              Giỏ hàng
            </Typography>
          </Box>

          <Box sx={{ ...flexCenter, gap: "4px", cursor: "pointer" }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                bgcolor: "#FDF3D9",
                ...flexCenter,
                borderRadius: "8px 8px 20px 8px",
                transition: "border-radius 0.3s ease",
                "&:hover": {
                  borderBottomRightRadius: "8px"
                }
              }}
            >
              <Image
                src="/images/Icon/user-circle.png"
                width={20}
                height={20}
                alt="Tra cứu đơn hàng"
              />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: "16px",
                color: "#757577"
              }}
            >
              Đăng nhập
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

export default Header
