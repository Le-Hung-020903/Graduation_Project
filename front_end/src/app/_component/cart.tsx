"use client"
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import DiscountIcon from "@mui/icons-material/Discount"
import Stack from "@mui/material/Stack"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Divider from "@mui/material/Divider"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import LinearProgress from "@mui/material/LinearProgress"
import Checkbox from "@mui/material/Checkbox"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import FormControlLabel from "@mui/material/FormControlLabel"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import {
  deleteCartAPI,
  getCartAPI,
  updateCartAPI
} from "@/redux/middlewares/cartMiddlewares"
import { selectCartUser } from "@/redux/slice/cartSlice"
import { formattedAmount } from "../utils/formatMoney"
import { setOrderItem } from "@/redux/slice/orderSlice"
import { toast } from "react-toastify"

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const cart = useSelector(selectCartUser)
  console.log("🚀 ~ Cart ~ cart:", cart)
  const dispatch = useDispatch<AppDispatch>()

  const [checkedItem, setCheckedItem] = useState<{ [key: number]: boolean }>({})

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked: { [key: number]: boolean } = {}
    cart?.items.forEach((item) => {
      newChecked[item.id] = event.target.checked
    })
    setCheckedItem(newChecked)

    // Cập nhật tổng tiền
    if (event.target.checked) {
      // Nếu checkbox chọn tất cả, tính tổng tiền cho tất cả các sản phẩm được chọn
      const newTotal = cart.items.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
      setTotalPrice(newTotal)
    } else {
      // Nếu checkbox bỏ chọn tất cả, đặt lại tổng tiền về 0
      setTotalPrice(0)
    }
  }

  const allChecked =
    cart.items.length > 0 && cart.items.every((item) => checkedItem[item.id])

  const isIndeterminate = cart.items.some(
    (item) => checkedItem[item.id] && !allChecked
  )
  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedItem((prev) => ({ ...prev, [id]: checked }))
  }

  const selectedCount = Object.values(checkedItem).filter(Boolean).length

  // Lưu sản phẩm được chọn vào redux để tạo đơn hàng
  const orderDetails = cart.items.filter((item) => checkedItem[item.id])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [pendingId, setPendingId] = useState<number | null>(null)

  // Mở dialog để xoá sản phẩm
  const activeDialog = useMemo(() => {
    return cart.items.find((i) => i.id === pendingId)
  }, [cart, pendingId])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleDeleteCartProduct = () => {
    if (activeDialog && activeDialog.id) {
      dispatch(deleteCartAPI(activeDialog.id))
      toast.success("Xoá sản phẩm khỏi giỏ hàng thành công")
      setOpenDialog(false)
      setPendingId(null)
    }
  }

  const handleIncrement = (
    id: number,
    price: number,
    variant: number,
    product: number
  ) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) + 1
      setTotalPrice((prev) => prev + price)
      dispatch(
        updateCartAPI({
          id: cart.cartId ? cart.cartId : 0,
          data: {
            cart_product: {
              product_id: product,
              variant_id: variant,
              quantity: newQuantity,
              price: price
            }
          }
        })
      ).then(() => {
        dispatch(getCartAPI())
      })
      return { ...prev, [id]: newQuantity }
    })
  }

  const handleDecrement = (
    id: number,
    price: number,
    variant: number,
    product: number
  ) => {
    setQuantities((prev) => {
      const quantity = prev[id]
      if (prev[id] > 1) {
        const newQuantity = quantity - 1
        setTotalPrice((prev) => prev - price)
        dispatch(
          updateCartAPI({
            id: cart.cartId ? cart.cartId : 0,
            data: {
              cart_product: {
                product_id: product,
                variant_id: variant,
                quantity: newQuantity,
                price: price
              }
            }
          })
        ).then(() => {
          dispatch(getCartAPI())
        })
        return { ...prev, [id]: newQuantity }
      } else {
        setOpenDialog(true)
        setPendingId(id)
      }
      return prev // Người dùng bấm Huỷ
    })
  }

  const optimizeCloudinaryImage = (
    url: string | undefined | null,
    width = 200,
    height = 200
  ) => {
    if (!url) return "/fallback.jpg"
    if (url.includes("res.cloudinary.com")) {
      return url.replace(
        "/upload/",
        `/upload/w_${width},h_${height},c_fill,q_100,f_webp,e_sharpen/`
      )
    }
    return url
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 1) {
      setQuantities((prev) => ({ ...prev, [id]: value }))

      // Cập nhật tổng tiền
      const newTotal = orderDetails.reduce(
        (sum, item) =>
          sum +
          item.price * (id === item.id ? value : quantities[item.id] || 1),
        0
      )
      setTotalPrice(newTotal)
    }
  }

  // Tính toán lại số lượng sản phẩm khi có sự thay đổi
  useEffect(() => {
    if (cart.items.length > 0) {
      const initialQuantities = cart.items.reduce((acc, item) => {
        acc[item.id] = item.quantity
        return acc
      }, {} as { [key: number]: number })
      setQuantities(initialQuantities)
    }
    // setCartProducts(cart.items)
  }, [cart])

  // Tính toán giá khi được checked
  useEffect(() => {
    if (orderDetails.length > 0) {
      const initialTotalPrice = orderDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      setTotalPrice(initialTotalPrice)
    }
  }, [orderDetails])

  // Lấy giỏ hàng từ redux
  useEffect(() => {
    dispatch(getCartAPI())
  }, [dispatch])

  return (
    <Box>
      {loading && (
        <Box sx={{ width: "100%", color: "grey.500", mt: 1.5 }}>
          <LinearProgress color="success" />
        </Box>
      )}
      <Box
        sx={{
          mt: 8
        }}
      >
        <Typography
          component={"h3"}
          sx={{
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "700",
            color: "primary.main"
          }}
        >
          Giỏ hàng của bạn
        </Typography>
        {cart.items.length === 0 ? (
          <Typography
            mt={7}
            variant="h5"
            sx={{
              textAlign: "center"
            }}
          >
            Giỏ hàng chưa có sản phẩm nào. Hãy tiếp tục lựa chọn sản phẩm nào !
          </Typography>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{
              mt: 6
            }}
          >
            <Grid
              item
              xs={12}
              sm={9}
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
                          <TableCell
                            sx={{
                              width: "20px",
                              padding: "0 0 0 8px"
                            }}
                          >
                            <FormControlLabel
                              label=""
                              control={
                                <Checkbox
                                  checked={allChecked}
                                  indeterminate={isIndeterminate}
                                  onChange={handleCheckAll}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              pl: 0
                            }}
                          >
                            Sản phẩm
                          </TableCell>
                          <TableCell align="center">Đơn giá</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="right">Thành tiền</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart?.items?.map((item) => (
                          <TableRow
                            key={item.id}
                            sx={{
                              height: "120px" // Đặt chiều cao cố định cho mỗi hàng
                            }}
                          >
                            <TableCell
                              sx={{
                                width: "20px",
                                padding: "0 0 0 8px"
                              }}
                            >
                              <Box>
                                <FormControlLabel
                                  label=""
                                  control={
                                    <Checkbox
                                      checked={checkedItem[item.id] || false}
                                      onChange={(e) =>
                                        handleItemCheck(
                                          item.id,
                                          e.target.checked
                                        )
                                      }
                                    />
                                  }
                                />
                              </Box>
                            </TableCell>
                            <TableCell sx={{ verticalAlign: "middle", pl: 0 }}>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={4}
                                sx={{
                                  width: "100%",
                                  height: "100%" // Chiếm toàn bộ chiều cao của ô
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100px",
                                    height: "100px",
                                    overflow: "hidden",
                                    borderRadius: "10px",
                                    flexShrink: 0 // Ngăn không cho ảnh co lại
                                  }}
                                >
                                  <Image
                                    src={optimizeCloudinaryImage(
                                      item.images.url ? item.images.url : "",
                                      400,
                                      400
                                    )}
                                    width={100}
                                    height={100}
                                    alt={item.product.name}
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: "10px"
                                    }}
                                  />
                                </Box>

                                <Stack
                                  justifyContent={"center"} // Căn giữa theo chiều dọc
                                  sx={{
                                    height: "100%"
                                  }}
                                >
                                  <Typography>{item.product.name}</Typography>
                                  <Button
                                    endIcon={<KeyboardArrowDownIcon />}
                                    sx={{
                                      color: "black",
                                      minWidth: "150px",
                                      maxWidth: "150px",
                                      mt: 1,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      textAlign: "left",
                                      padding: "6px 16px"
                                    }}
                                    variant="outlined"
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        flex: 1, // Chiếm hết không gian còn lại
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                      }}
                                    >
                                      {item.variantSelected?.name}
                                    </Box>
                                  </Button>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ verticalAlign: "middle" }} // Căn giữa theo chiều dọc
                            >
                              {formattedAmount(item.price)}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ verticalAlign: "middle" }} // Căn giữa theo chiều dọc
                            >
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"center"} // Căn giữa cả chiều ngang
                                sx={{ height: "100%" }} // Chiếm toàn bộ chiều cao
                              >
                                <Button
                                  variant="outlined"
                                  className="interceptor-loading"
                                  onClick={() =>
                                    // handleDecrement(
                                    //   item.id,
                                    //   item.price,
                                    //   item.variant.id,
                                    //   item.product.id
                                    // )
                                    handleDecrement(
                                      item.id,
                                      item.price,
                                      item.variantSelected.id,
                                      item.product.id
                                    )
                                  }
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
                                  className="interceptor-loading"
                                  type="number"
                                  value={quantities[item.id] || 1}
                                  onChange={(e) =>
                                    handleInputChange(e, item.id)
                                  }
                                  inputProps={{
                                    min: 1,
                                    style: { appearance: "textfield" }
                                  }}
                                  sx={{
                                    mx: 1,
                                    width: "60px",
                                    "& .MuiInputBase-root": { height: "30px" },
                                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                      {
                                        display: "none"
                                      }
                                  }}
                                />

                                <Button
                                  variant="outlined"
                                  className="interceptor-loading"
                                  onClick={() =>
                                    // handleIncrement(
                                    //   item.id,
                                    //   item.price,
                                    //   item.variant.id,
                                    //   item.product.id
                                    // )
                                    handleIncrement(
                                      item.id,
                                      item.price,
                                      item.variantSelected.id,
                                      item.product.id
                                    )
                                  }
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
                            <TableCell
                              align="right"
                              sx={{ verticalAlign: "middle" }} // Căn giữa theo chiều dọc
                            >
                              {formattedAmount(
                                item.price * (quantities[item.id] || 1)
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                pt: "0 !important"
              }}
            >
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
                    <Typography>{formattedAmount(totalPrice)}</Typography>
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
                      {formattedAmount(totalPrice)}
                    </Typography>
                  </Stack>

                  {/* Nút Mua hàng */}
                  <Link
                    href={"/checkout"}
                    onClick={(e) => {
                      if (selectedCount === 0) {
                        e.preventDefault() // Ngăn không cho điều hướng
                      }
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        if (selectedCount > 0) {
                          dispatch(setOrderItem(orderDetails))
                          setLoading(true)
                        }
                      }}
                      disabled={selectedCount === 0}
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        py: 1.5,
                        "&:hover": {
                          bgcolor: "primary.dark"
                        },
                        "&.Mui-disabled": {
                          bgcolor: "grey.400",
                          color: "white",
                          cursor: "not-allowed",
                          pointerEvents: "auto" // tắt chế độ none của MUI
                        }
                      }}
                    >
                      {`Mua hàng (${selectedCount})`}
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Xoá sản phẩm`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn xoá sản phẩm ${activeDialog?.product.name} - ${
                activeDialog?.variantSelected.name
              } này với giá ${formattedAmount(
                activeDialog?.price ?? 0
              )} khỏi giỏ hàng không`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCartProduct} variant="outlined">
              Đồng ý
            </Button>
            <Button onClick={handleCloseDialog}>Không muốn</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default Cart
