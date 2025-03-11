"use client"
import React, { useState } from "react"
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import DiscountIcon from "@mui/icons-material/Discount"
import RadioGroup from "@mui/material/RadioGroup"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Radio from "@mui/material/Radio"
import Link from "next/link"
// import { Checkbox, FormControlLabel } from "@mui/material"

const Order = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<string>("home")
  const [paymentMethod, setPaymentMethod] = useState<string>("cod") // "cod" hoặc "vnpay"
  return (
    <Grid
      container
      spacing={3}
      sx={{
        mt: 6
      }}
    >
      <Grid size={{ xs: 12, sm: 9 }}>
        <Box
          sx={{
            borderRadius: "4px",
            p: 2,
            bgcolor: "#F5F5F5"
          }}
        >
          <Typography
            component={"h3"}
            sx={{
              fontSize: "28px",
              fontWeight: "700"
            }}
          >
            Thanh toán
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              mt: 3
            }}
          >
            <Box>Sản phẩm rau má nội địa</Box>
            <Typography component={"span"}>x6</Typography>
            <Typography component={"span"}>720.000 đ</Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "4px",
            bgcolor: "#F5F5F5"
          }}
        >
          <Typography
            component={"h4"}
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              mb: 3
            }}
          >
            Hình thức nhận hàng
          </Typography>
          {/* Radio buttons để chọn hình thức nhận hàng */}
          <RadioGroup
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            sx={{ mb: 3 }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Box cho "Giao hàng tận nơi" */}
              <Box
                onClick={() => setDeliveryMethod("home")} // Bấm vào box sẽ chọn "home"
                sx={{
                  flex: 1, // Chiếm đều không gian
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", // Hiển thị con trỏ khi hover
                  backgroundColor:
                    deliveryMethod === "home"
                      ? "rgba(76, 175, 80, 0.1)"
                      : "transparent" // Màu nền khi được chọn
                }}
              >
                <Radio
                  value="home"
                  checked={deliveryMethod === "home"}
                  sx={{
                    color: "#4CAF50", // Màu khi không được chọn
                    "&.Mui-checked": {
                      color: "#4CAF50" // Màu khi được chọn
                    }
                  }}
                />
                <Typography sx={{ ml: 2 }}>Giao hàng tận nơi</Typography>
              </Box>

              {/* Box cho "Nhận tại nhà thuốc" */}
              <Box
                onClick={() => setDeliveryMethod("store")} // Bấm vào box sẽ chọn "store"
                sx={{
                  flex: 1, // Chiếm đều không gian
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", // Hiển thị con trỏ khi hover
                  backgroundColor:
                    deliveryMethod === "store"
                      ? "rgba(76, 175, 80, 0.1)"
                      : "transparent" // Màu nền khi được chọn
                }}
              >
                <Radio
                  value="store"
                  checked={deliveryMethod === "store"}
                  sx={{
                    color: "#4CAF50", // Màu khi không được chọn
                    "&.Mui-checked": {
                      color: "#4CAF50" // Màu khi được chọn
                    }
                  }}
                />
                <Typography sx={{ ml: 2 }}>Nhận tại nhà thuốc</Typography>
              </Box>
            </Box>
          </RadioGroup>
          <Box
            sx={{
              borderRadius: "4px",
              border: "1px solid #ccc",
              p: 2,
              mb: 3
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Thông tin vận chuyển
              </Typography>
              <Button variant="outlined" size="small">
                Thay đổi
              </Button>
            </Stack>

            <Typography sx={{ mt: 1 }}>Khoa Tân Nguyễn | 0867616720</Typography>
            <Typography>
              Đại Học Cần Thơ, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần
              Thơ
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "4px",
            bgcolor: "#F5F5F5"
          }}
        >
          <Typography
            component={"h4"}
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              mb: 3
            }}
          >
            Phương thức thanh toán
          </Typography>

          {/* RadioGroup để chọn phương thức thanh toán */}
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 3 }}
          >
            {/* Box cho COD */}
            <Box
              onClick={() => setPaymentMethod("cod")} // Bấm vào box sẽ chọn "cod"
              sx={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer", // Hiển thị con trỏ khi hover
                backgroundColor:
                  paymentMethod === "cod"
                    ? "rgba(76, 175, 80, 0.1)"
                    : "transparent" // Màu nền khi được chọn
              }}
            >
              <Radio
                value="cod"
                checked={paymentMethod === "cod"}
                sx={{
                  color: "#4CAF50", // Màu khi không được chọn
                  "&.Mui-checked": {
                    color: "#4CAF50" // Màu khi được chọn
                  }
                }}
              />
              <Typography>
                COD
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Tiền mặt
                </Typography>
              </Typography>
            </Box>

            {/* Box cho Ví VNPay */}
            <Box
              onClick={() => setPaymentMethod("vnpay")} // Bấm vào box sẽ chọn "vnpay"
              sx={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                p: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer", // Hiển thị con trỏ khi hover
                backgroundColor:
                  paymentMethod === "vnpay"
                    ? "rgba(76, 175, 80, 0.1)"
                    : "transparent" // Màu nền khi được chọn
              }}
            >
              <Radio
                value="vnpay"
                checked={paymentMethod === "vnpay"}
                sx={{
                  color: "#4CAF50", // Màu khi không được chọn
                  "&.Mui-checked": {
                    color: "#4CAF50" // Màu khi được chọn
                  }
                }}
              />
              <Typography>Ví VNPay</Typography>
            </Box>
          </RadioGroup>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0.7}
            sx={{
              borderRadius: "4px",
              bgcolor: "#F5F5F5",
              p: 2,
              cursor: "pointer"
            }}
          >
            <DiscountIcon sx={{ color: "primary.main" }} />
            <Typography
              component={"span"}
              sx={{
                fontWeight: "700"
              }}
            >
              Khuyến mãi
            </Typography>
          </Stack>
          <Box
            sx={{
              borderRadius: "4px",
              bgcolor: "#F5F5F5",
              p: 2,
              mt: 3
            }}
          >
            <Typography
              component={"h4"}
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                mb: 3
              }}
            >
              Chi tiết thanh toán
            </Typography>
            {/* Tạm tính */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography>Tạm tính</Typography>
              <Typography>720.000 đ</Typography>
            </Stack>

            {/* Giảm giá ưu đãi */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography>Giảm giá</Typography>
              <Typography>-</Typography>
            </Stack>

            {/* Giảm giá sản phẩm */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Typography>Phí vận chuyển</Typography>
              <Typography>-</Typography>
            </Stack>

            <Divider />
            {/* Tổng tiền */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2, mt: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Tổng tiền
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "red" }}
              >
                720.000 đ
              </Typography>
            </Stack>

            {/* Nút Mua hàng */}
            <Link href={"/checkout"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "primary.dark"
                  }
                }}
              >
                Mua hàng (1)
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Order
