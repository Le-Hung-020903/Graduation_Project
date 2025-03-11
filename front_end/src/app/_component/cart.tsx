"use client"
import React, { ChangeEvent, useState } from "react"
import DiscountIcon from "@mui/icons-material/Discount"
import Stack from "@mui/material/Stack"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Divider from "@mui/material/Divider"
import Link from "next/link"

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(1)
  const [price, setPrice] = useState<number>(1200) // đơn giá cố định

  const [totalPrice, setTotalPrice] = useState<number>(quantity * price)
  const handleIncrement = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    setTotalPrice(price * newQuantity)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      setTotalPrice(price * newQuantity)
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const number = parseInt(value, 10)
    if (!isNaN(number) && number >= 1) {
      setQuantity(number)
      setTotalPrice(price * number)
    }
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mt: 6
      }}
    >
      <Grid
        size={{ xs: 12, sm: 9 }}
        sx={{
          borderRadius: "4px",
          bgcolor: "#F5F5F5",
          p: 2
        }}
      >
        <Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              mt: 4,
              p: 1,
              borderRadius: "4px",
              fontWeight: "700",
              bgcolor: "#B2DFC8"
            }}
          >
            <LocalShippingIcon />
            <Typography>
              Miễn phí vận chuyển cho mọi đơn đến hết tháng 4
            </Typography>
          </Stack>
          <Box sx={{ mt: 4 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">Đơn giá</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Bột pha uống Bioflora 100mg trị tiêu chảy cấp ở t...
                    </TableCell>
                    <TableCell align="right">120.000 đ</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                      >
                        <Button
                          variant="outlined"
                          onClick={handleDecrement}
                          sx={{
                            minWidth: "30px",
                            minHeight: "30px",
                            borderRadius: "50%",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "#f5f5f5"
                            }
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <TextField
                          type="number"
                          value={quantity}
                          onChange={handleInputChange}
                          inputProps={{ min: 1 }} // Giá trị tối thiểu là 1
                          sx={{
                            mx: 1,
                            width: "60px",
                            "& .MuiInputBase-root": { height: "30px" }
                          }}
                        />
                        <Button
                          variant="outlined"
                          onClick={handleIncrement}
                          sx={{
                            minWidth: "30px",
                            minHeight: "30px",
                            borderRadius: "50%",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "#f5f5f5"
                            }
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">480.000 đ</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Bột pha uống Bioflora 100mg trị tiêu chảy cấp ở t...
                    </TableCell>
                    <TableCell align="right">120.000 đ</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                      >
                        <Button
                          variant="outlined"
                          onClick={handleDecrement}
                          sx={{
                            minWidth: "30px",
                            minHeight: "30px",
                            borderRadius: "50%",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "#f5f5f5"
                            }
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <TextField
                          type="number"
                          value={quantity}
                          onChange={handleInputChange}
                          inputProps={{ min: 1 }} // Giá trị tối thiểu là 1
                          sx={{
                            mx: 1,
                            width: "60px",
                            "& .MuiInputBase-root": { height: "30px" }
                          }}
                        />
                        <Button
                          variant="outlined"
                          onClick={handleIncrement}
                          sx={{
                            minWidth: "30px",
                            minHeight: "30px",
                            borderRadius: "50%",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "#f5f5f5"
                            }
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{totalPrice} đ</TableCell>
                  </TableRow>
                  {/* Thêm các hàng khác nếu cần */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
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
            {/* Tạm tính */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography>Tạm tính</Typography>
              <Typography>{totalPrice} đ</Typography>
            </Stack>

            {/* Giảm giá ưu đãi */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography>Giảm giá ưu đãi</Typography>
              <Typography>-</Typography>
            </Stack>

            {/* Giảm giá sản phẩm */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Typography>Giảm giá sản phẩm</Typography>
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
                {totalPrice} đ
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

export default Cart
