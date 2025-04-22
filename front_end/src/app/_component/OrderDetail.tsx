"use client"
import { useRouter } from "next/navigation"
import Button from "@mui/material/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Box from "@mui/material/Box"
import React from "react"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import { orderDetailResponse } from "../_interfaces/orderDetail"
import dayjs from "dayjs"
import Paper from "@mui/material/Paper"
import HomeIcon from "@mui/icons-material/Home"
import Image from "next/image"
import PaymentIcon from "@mui/icons-material/Payment"
import Divider from "@mui/material/Divider"
import PhoneIcon from "@mui/icons-material/Phone"
import PersonIcon from "@mui/icons-material/Person"
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation"
import { formattedAmount } from "../utils/formatMoney"
import { setOrderItem } from "@/redux/slice/orderSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { ICartProduct } from "../_interfaces/cart"

type OrderDetailProps = {
  orderDetail: orderDetailResponse["data"]
}

const OrderDetail = ({ orderDetail }: OrderDetailProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()
  const handleGoBack = () => {
    router.back() // Quay lại trang trước đó
  }

  const data = orderDetail.orderDetails.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.variant.price,
    product: {
      id: item.product.id,
      name: item.product.name
    },
    variant: {
      id: item.variant.id,
      name: item.variant.name
    },
    variantSelected: {
      id: item.variant.id,
      name: item.variant.name
    },
    images: item.product.images[0]
  }))

  const handleReOrder = (order: ICartProduct[]) => {
    if (data.length > 0) {
      dispatch(setOrderItem(order))
      router.push("/checkout")
    }
  }
  return (
    <Box>
      <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={handleGoBack}
          sx={{
            mb: 3, // margin bottom
            textTransform: "none", // không viết hoa chữ
            "&:hover": {
              backgroundColor: "#f5f5f5" // màu nền khi hover
            }
          }}
        >
          Quay lại
        </Button>
        <Typography variant="h6">Chi tiết đơn hàng</Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{ mb: 2 }}
          >
            <Typography
              sx={{
                color: "text.secondary"
              }}
            >
              Mã đơn hàng:
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold"
              }}
            >
              {orderDetail.order_code}
            </Typography>
          </Stack>
          <Typography>
            {dayjs(orderDetail.created_at, "DD/MM/YYYY HH:mm").format(
              "YYYY/MM/DD HH:mm"
            )}
          </Typography>
        </Box>
        <Box>
          <Chip label={orderDetail.status} color="primary" variant="filled" />
        </Box>
      </Stack>
      <Box>
        {orderDetail.orderDetails.map((item) => {
          return (
            <Paper key={item.id} elevation={2} sx={{ mt: 2, p: 3 }}>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      width: "130px",
                      height: "130px",
                      overflow: "hidden",
                      borderRadius: "10px",
                      flexShrink: 0, // Ngăn không cho ảnh co lại,
                      mr: 5
                    }}
                  >
                    <Image
                      src={
                        item.product.images[0].url
                          ? item.product.images[0].url
                          : "/no-image.png"
                      }
                      alt={item.product.name || "Product image"}
                      width={130}
                      height={130}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ fontSize: "18px" }}
                    >
                      {item.product.name}
                    </Typography>
                    <Chip
                      label={item.variant.name}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 0, // Vuông góc
                        fontSize: "0.75rem",
                        height: "26px",
                        paddingX: "5px"
                      }}
                    />
                  </Box>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Typography>Số lượng:</Typography>
                  <Typography>{item.quantity}</Typography>
                </Stack>
              </Stack>
            </Paper>
          )
        })}
      </Box>
      <Paper elevation={4} sx={{ mt: 8, p: 3 }}>
        <Stack direction={"row"} spacing={1}>
          <PaymentIcon />
          <Typography>Thông tin thanh toán</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mt={3}>
          <Typography>Tổng tiền sản phẩm:</Typography>
          <Typography>{formattedAmount(orderDetail.total_price)}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
          <Typography>Giảm giá:</Typography>
          <Typography>{formattedAmount(orderDetail.final_price)}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
          <Typography>Phí vận chuyển:</Typography>
          <Typography>Miễn phí</Typography>
        </Stack>
        <Divider
          sx={{
            mt: 2
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
          <Typography>Phải thanh toán:</Typography>
          <Typography>
            {formattedAmount(orderDetail.total_price - orderDetail.final_price)}
          </Typography>
        </Stack>
      </Paper>
      <Paper elevation={4} sx={{ mt: 8, p: 3 }}>
        <Stack direction={"row"} spacing={1}>
          <NotListedLocationIcon />
          <Typography>Thông tin giao hàng</Typography>
        </Stack>
        <Box mt={3}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <PersonIcon />
            <Typography>{orderDetail.address.name}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
            <PhoneIcon />
            <Typography>{orderDetail.address.phone}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
            <HomeIcon />
            <Typography>{`${orderDetail.address.street} - ${orderDetail.address.ward} - ${orderDetail.address.district} - ${orderDetail.address.province}`}</Typography>
          </Stack>
        </Box>
      </Paper>
      <Box>
        <Button
          variant="outlined"
          sx={{
            my: 5,
            width: "100%"
          }}
          onClick={() => handleReOrder(data)}
        >
          Mua lại
        </Button>
      </Box>
    </Box>
  )
}

export default OrderDetail
