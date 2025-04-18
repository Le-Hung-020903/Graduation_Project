import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import FavoriteProduct from "@/app/_component/FavoriteProduct"

const PageMember = () => {
  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Box
          sx={{
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#F0F0F0",
            border: "1px solid #F0F0F0"
          }}
        >
          <Image
            src="https://i.pravatar.cc/76?img=1"
            width={0}
            height={0}
            sizes="100vw"
            alt="Logo website clean food"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "24px",
              textTransform: "uppercase",
              color: "primary.main"
            }}
          >
            đình hùng
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              textTransform: "uppercase",
              color: "#757577"
            }}
          >
            0383545843
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          width: "450px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          p: 4,
          mt: 6
        }}
      >
        <Stack sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "bold"
            }}
          >
            7
          </Typography>
          <Typography>đơn hàng</Typography>
        </Stack>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: "black"
          }}
        />
        <Stack sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "bold"
            }}
          >
            4M
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          mt: 6
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            mb: 4
          }}
        >
          Sản phẩm bạn yêu thích
        </Typography>
        <FavoriteProduct />
      </Box>
    </Box>
  )
}

export default PageMember
