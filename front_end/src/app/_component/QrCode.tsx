"use client"
import React, { useEffect, useRef, useState } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { formattedAmount } from "../utils/formatMoney"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { checkStatusOrderAPI } from "../api/apiwithclient"
import { useSelector } from "react-redux"
import { selectOrder } from "@/redux/slice/orderSlice"
import { initSocket } from "../library/websocket/socket"
import { IWebsocketOrderData } from "../_interfaces/order"
import { selectCurrentUser } from "@/redux/slice/userSlice"

const QrCode = () => {
  const user = useSelector(selectCurrentUser)
  const router = useRouter()
  const socket = initSocket()
  const { totalPrice, orderCode } = useSelector(selectOrder)

  // Với việc sepay chỉ chấp nhận làdufng webhook khi đã deloy nên dùng cách là
  // Truy cập vào 20 list gần nhất để có thể kiểm tra và check tài khoản
  const [qrCode, setQrCode] = useState({
    orderId: orderCode,
    total: totalPrice,
    accountName: "Trần Công Định",
    accountNumber: "0392115894",
    bankName: "Ngân hàng MBBank",
    codeBank: "MB",
    paymentStatus: "PAID",
    template: "compact",
    image: `https://qr.sepay.vn/assets/img/banklogo/MB.png`
  })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkPaymentStatus = async (order_code: string) => {
      const { data } = await checkStatusOrderAPI(order_code)
      if (data.payment_status === "PAID") {
        setQrCode((pre) => {
          return {
            ...pre,
            paymentStatus: "PAID"
          }
        })

        // gửi socket đi cho Admin nhận biết
        const socketOrderData: IWebsocketOrderData = {
          order_code: orderCode,
          payment_status: "PAID",
          payment_method: "QR_PAYMENT",
          admin_redirect_url: "/order",
          user_redirect_url: `/member/history/${data.id}`,
          user_id: user?.id
        }
        socket.emit("new_order", socketOrderData)

        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null // Xóa giá trị sau khi dừng interval
        }
        router.push("/thankyou")
      }
    }

    timerRef.current = setInterval(() => {
      checkPaymentStatus(orderCode)
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      } // ✅ Cleanup interval khi rời khỏi trang
    }
  }, [orderCode, router])

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: "0 !important"
      }}
    >
      <Box>
        <Box textAlign="center" my={4}>
          <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
          <Typography variant="h4" color="success.main">
            Đặt hàng thành công
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mã đơn hàng: #{orderCode}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%"
          }}
        >
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin đơn hàng
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Tổng:</TableCell>
                    <TableCell align="right">
                      <b>{formattedAmount(Number(qrCode.total))}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thuế:</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-body": {
                        borderBottom: "none"
                      }
                    }}
                  >
                    <TableCell>Tổng cộng:</TableCell>
                    <TableCell align="right">
                      <b>{formattedAmount(Number(qrCode.total))}</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box
            sx={{
              mt: 8
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 1
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: "center",
                  mb: 0
                }}
              >
                Hướng dẫn thanh toán qua chuyển khoản ngân hàng
              </Typography>
            </Paper>

            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                md={7}
                textAlign="center"
                sx={{
                  mt: 3
                }}
              >
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Cách 1: Mở app ngân hàng và quét mã QR
                  </Typography>
                  <Box
                    my={2}
                    sx={{
                      textAlign: "center"
                    }}
                  >
                    <Image
                      src={`https://qr.sepay.vn/img?acc=${qrCode.accountNumber}&bank=${qrCode.codeBank}&amount=${qrCode.total}&des=${qrCode.orderId}&template=${qrCode.template}&download=DOWNLOAD`}
                      alt="qr code"
                      width={550}
                      height={550}
                      style={{
                        objectFit: "cover"
                      }}
                    />
                    <Typography color="text.secondary" sx={{ mt: 2 }}>
                      Trạng thái:
                      {qrCode.paymentStatus === "UNPAID"
                        ? " Chờ thanh toán..."
                        : " Đã thanh toán"}
                      {qrCode.paymentStatus === "UNPAID" && (
                        <CircularProgress size={40} sx={{ ml: 4 }} />
                      )}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  mt: 3
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Cách 2: Chuyển khoản thủ công theo thông tin
                  </Typography>
                  <Box
                    sx={{
                      textAlign: "center"
                    }}
                  >
                    <Image
                      src={`${qrCode.image}`}
                      alt="Ngân hàng"
                      width={200}
                      height={70}
                    />
                  </Box>

                  <TableContainer>
                    <Table size="medium">
                      <TableBody>
                        <TableRow>
                          <TableCell>Chủ tài khoản:</TableCell>
                          <TableCell>
                            <b>{qrCode.accountName}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Số TK:</TableCell>
                          <TableCell>
                            <b>{qrCode.accountNumber}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Số tiền:</TableCell>
                          <TableCell>
                            <b>{formattedAmount(totalPrice)}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nội dung CK:</TableCell>
                          <TableCell>
                            <b>{orderCode}</b>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, bgcolor: "#F8F9FA", p: 1 }}
                  >
                    {`Lưu ý: Vui lòng giữ nguyên nội dung chuyển khoản ${qrCode.orderId} để hệ thống
                    tự động xác nhận thanh toán.`}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box textAlign="left" my={4}>
          <Link href="/checkout">
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              Quay lại
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default QrCode
