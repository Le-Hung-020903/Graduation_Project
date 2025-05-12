"use client"
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState
} from "react"
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import DiscountIcon from "@mui/icons-material/Discount"
import RadioGroup from "@mui/material/RadioGroup"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Radio from "@mui/material/Radio"
import Drawer from "@mui/material/Drawer"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import { useDispatch, useSelector } from "react-redux"
import { formattedAmount } from "../utils/formatMoney"
import Image from "next/image"
import { optimizeCloudinaryImage } from "../utils/optimizeImage"
import { ICartProduct } from "../_interfaces/cart"
import CloseIcon from "@mui/icons-material/Close"
import LinearProgress from "@mui/material/LinearProgress"
import {
  Edit as EditIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material"
import {
  checkExistOrderAPI,
  createAddressAPI,
  createOrderAPI,
  getAddressAPI,
  getDiscountAPI,
  updateOrderAPI
} from "../api/apiwithclient"
import { IDiscount } from "../_interfaces/discount"
import { formatDate } from "../utils/formatDate"
import { IAddress } from "../_interfaces/user"
import { toast } from "react-toastify"
import { List, ListItem } from "@mui/material"
import { useRouter } from "next/navigation"
import { PaymentMethod } from "../_interfaces/order"
import { AppDispatch } from "@/redux/store"
import { selectOrderItems, setOrder } from "@/redux/slice/orderSlice"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px"
}

const initialFormData = {
  name: "",
  phone: "",
  province: "",
  district: "",
  ward: "",
  street: "",
  is_default: false
}

const Order = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [openDiscount, setOpenDiscount] = useState<boolean>(false)
  const [openAddress, setOpenAddress] = useState<boolean>(false)
  const [address, setAddress] = useState<IAddress>(initialFormData)
  console.log("🚀 ~ Order ~ address:", address)
  const [listAdrress, setListAdrress] = useState<IAddress[]>([])
  const [vouchers, setVouchers] = useState<IDiscount[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null)
  const [discountAmount, setDiscountAmount] = useState<number>(0) // Lưu số tiền giảm
  const [finalPrice, setFinalPrice] = useState<number>(0) // Lưu tổng tiền sau giảm giá
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  )
  const [deliveryMethod, setDeliveryMethod] = useState<string>("home")
  const [note, setNote] = useState<string>("")

  const orderDetails = useSelector(selectOrderItems)

  const handleSubmitOrder = () => {
    const items = orderDetails.map((item) => {
      return {
        quantity: item.quantity,
        price: item.price,
        product_id: item.product.id,
        variant_id: item.variantSelected?.id ? item.variantSelected?.id : 0
      }
    })

    const data = {
      discount_id: selectedVoucher ? selectedVoucher : null,
      address_id: address.id ? address.id : 0,
      note: note,
      final_price: finalPrice,
      payment_method: paymentMethod as PaymentMethod,
      order_details: items
    }

    toast.promise(checkExistOrderAPI(), {}).then((res) => {
      if (!res.exits) {
        // Tạo đơn hàng mới nếu không tồn tại
        toast
          .promise(createOrderAPI(data), {
            pending: "Đang tạo đơn hàng..."
          })
          .then((res) => {
            if (res.success) {
              toast.success("Tạo đơn hàng thành công!")
              dispatch(
                setOrder({
                  orderCode: res.data.order_code,
                  totalPrice: res.data.final_price
                })
              )
              setLoading(true)
              const redirectUrl =
                paymentMethod === PaymentMethod.COD
                  ? "/thankyou"
                  : `/checkout/${res.data.order_code}`
              router.push(redirectUrl)
            }
          })
      } else if (res.exits && res.orderId) {
        // Chỉ chỉnh sửa đơn hàng nếu có orderId hợp lệ
        toast.promise(updateOrderAPI(res.orderId, data), {}).then((res) => {
          dispatch(
            setOrder({
              orderCode: res.data.order_code,
              totalPrice: res.data.final_price
            })
          )
          setLoading(true)
          const redirectUrl =
            paymentMethod === PaymentMethod.COD
              ? "/thankyou"
              : `/checkout/${res.data.order_code}`
          router.push(redirectUrl)
        })
      }
    })
  }

  const toggleDrawer = (state: boolean) => () => {
    setOpenDiscount(state)
  }

  const handleCloseAndOpenModal = () => {
    handleOpenAdress(false)
    setOpen(true)
  }

  const handleOpenAdress = (state: boolean) => {
    setOpenAddress(state)
  }

  const handleOpen = (): void => {
    setOpen(!open)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    setAddress({
      ...address,
      [name!]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    })
  }

  // Tính tổng giá ban đầu
  const handleTotal = (order: ICartProduct[]): number => {
    return order.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }

  // Tính totalPrice khi `order.items` thay đổi
  const totalPrice = useMemo(() => handleTotal(orderDetails), [orderDetails])

  // Xử lý áp dụng mã giảm giá
  const handleApply = () => {
    if (selectedVoucher !== null) {
      const selected = vouchers.find((v) => v.id === selectedVoucher)
      if (selected) {
        const discountPercent = Number(selected.percent) / 100
        const discount = totalPrice * discountPercent
        setDiscountAmount(discount)
        setFinalPrice(totalPrice - discount)
      }
    } else {
      setDiscountAmount(0)
      setFinalPrice(totalPrice)
    }
    toggleDrawer(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast
      .promise(createAddressAPI(address), {
        pending: "Đang lưu địa chỉ..."
      })
      .then((res) => {
        if (res.success) {
          toast.success("lưu địa chỉ thành công")
          setAddress(initialFormData)
        }
      })
    handleOpen()
  }

  // Cập nhật giá trị `finalPrice` mỗi khi `totalPrice` thay đổi
  useEffect(() => {
    setFinalPrice(totalPrice)
  }, [totalPrice])

  useEffect(() => {
    const fetchDiscountAPI = async () => {
      const { data } = await getDiscountAPI()
      setVouchers(
        data.map((item: IDiscount) => {
          return {
            id: item.id,
            percent: item.percent,
            content: item.content,
            end_date: item.end_date
          }
        })
      )
    }

    const fecthAdress = async () => {
      const { data } = await getAddressAPI()
      setListAdrress(
        data.map((item: IAddress) => {
          return {
            id: item.id,
            name: item.name,
            phone: item.phone,
            province: item.province,
            district: item.district,
            ward: item.ward,
            street: item.street,
            is_default: item.is_default
          }
        })
      )
      const isDefault = data.find((i: IAddress) => i.is_default)
      setAddress(isDefault)
    }

    fetchDiscountAPI()
    fecthAdress()
  }, [])

  return (
    <Box>
      {loading && (
        <Box sx={{ width: "100%", color: "grey.500", mt: 1.5 }}>
          <LinearProgress color="success" />
        </Box>
      )}
      <Typography
        component={"h3"}
        sx={{
          textAlign: "center",
          fontSize: "35px",
          fontWeight: "700",
          color: "primary.main",
          mt: 8
        }}
      >
        Đơn hàng của bạn
      </Typography>
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
            {orderDetails.map((item: ICartProduct, index) => {
              const isLastItem = index === orderDetails.length - 1
              return (
                <Stack
                  key={item.id}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    borderBottom: isLastItem ? "none" : "1px solid #ddd",
                    py: 2
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={2}
                    sx={{
                      flex: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                        borderRadius: "10px"
                      }}
                    >
                      <Image
                        src={optimizeCloudinaryImage(
                          item.images.url ? item.images.url : "",
                          400,
                          400
                        )}
                        width={100} // Đặt width cố định
                        height={100} // Đặt height cố định
                        alt={item.product.name}
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        flex: 1, // Để text không làm vỡ layout
                        minWidth: 0, // Tránh việc tràn layout
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {item.product.name}
                    </Typography>
                  </Stack>
                  <Typography
                    component={"span"}
                    sx={{
                      width: "50px", // Đặt width cố định để các số lượng thẳng hàng
                      textAlign: "center",
                      flexShrink: 0
                    }}
                  >
                    x{item.quantity}
                  </Typography>
                  <Typography
                    component={"span"}
                    sx={{
                      width: "300px", // Cố định chiều rộng để tránh lệch
                      textAlign: "right",
                      flexShrink: 0
                    }}
                  >
                    {formattedAmount(item.price * item.quantity)}
                  </Typography>
                </Stack>
              )
            })}
          </Box>

          <Box
            sx={{
              mt: 5,
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
                  <Typography sx={{ ml: 2 }}>Nhận tại cửa hàng</Typography>
                </Box>
              </Box>
            </RadioGroup>

            <Modal
              aria-labelledby="address-modal-title"
              aria-describedby="address-modal-description"
              open={openAddress}
              onClose={() => handleOpenAdress(false)}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500
                }
              }}
            >
              <Fade in={openAddress}>
                <Box
                  sx={{
                    ...style,
                    width: "600px"
                  }}
                >
                  <Typography
                    id="address-modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    Địa chỉ giao hàng
                  </Typography>

                  <List sx={{ mb: 2 }}>
                    {listAdrress.map((address, index) => (
                      <Box key={address.id}>
                        {index > 0 && <Divider sx={{ my: 1 }} />}
                        <ListItem
                          sx={{
                            alignItems: "flex-start",
                            p: 0,
                            "&:hover": {
                              backgroundColor: "action.hover"
                            }
                          }}
                          onClick={() =>
                            setSelectedAddress(address.id ? address.id : 0)
                          }
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"flex-start"}
                            spacing={2}
                            sx={{
                              width: "100%"
                            }}
                          >
                            <Radio
                              checked={selectedAddress === address.id}
                              onChange={() =>
                                setSelectedAddress(address.id ? address.id : 0)
                              }
                              value={address.id}
                              name="address-radio"
                              inputProps={{
                                "aria-label": `Chọn địa chỉ ${address.name}`
                              }}
                              sx={{ ml: 1 }}
                            />

                            <Box sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center",
                                  p: "8px 0"
                                }}
                              >
                                <Typography fontWeight="medium">
                                  {address.name} | {address.phone}
                                </Typography>

                                <IconButton
                                  edge="end"
                                  aria-label="edit"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // handleEditAddress(address)
                                  }}
                                  sx={{ ml: "auto" }}
                                >
                                  <EditIcon color="primary" fontSize="small" />
                                </IconButton>
                              </Box>

                              <Box
                                sx={{
                                  pr: 2,
                                  py: 1,
                                  width: "100%"
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`${address.street} - ${address.ward} - ${address.district} - ${address.province}`}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </ListItem>

                        {/* {address.id
                          ? address.id
                          : 0 < addresses.length - 1 && (
                              <Divider sx={{ my: 1 }} />
                            )} */}
                      </Box>
                    ))}
                  </List>

                  {/* Các nút hành động */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 7
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleCloseAndOpenModal}
                      sx={{ textTransform: "none" }}
                    >
                      Thêm địa chỉ
                    </Button>
                    <Box>
                      <Button
                        variant="text"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mr: 1, textTransform: "none" }}
                        onClick={() => handleOpenAdress(false)}
                      >
                        Quay lại
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          // Lưu địa chỉ đã chọn
                          // handleSaveSelectedAddress(selectedAddress)
                          handleOpenAdress(false)
                        }}
                        disabled={!selectedAddress}
                      >
                        Áp dụng
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Modal>

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
                {address ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenAdress(true)}
                    sx={{
                      ml: "auto"
                    }}
                  >
                    Thay đổi
                  </Button>
                ) : null}
              </Stack>

              {address ? (
                <Box
                  sx={{
                    mt: 4
                  }}
                >
                  <Typography sx={{ mt: 1, textTransform: "capitalize" }}>
                    {`${address.name} | ${address.phone}`}
                  </Typography>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {`${address.street} - ${address.ward} - ${address.district} -
                    ${address.province}`}
                  </Typography>
                </Box>
              ) : null}

              <Stack
                onClick={handleOpen}
                direction={"row"}
                sx={{
                  mt: 4,
                  cursor: "pointer",
                  color: "primary.main"
                }}
              >
                <ControlPointIcon
                  style={{ fill: "#128447" }}
                  sx={{
                    mr: 1.5
                  }}
                />
                <Typography>Cập nhật địa chỉ giao hàng</Typography>
              </Stack>

              {open ? (
                <Modal
                  open={open}
                  onClose={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Cập nhật địa chỉ giao hàng
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        label="Họ và tên"
                        name="name"
                        value={address.name}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={address.phone}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <FormControl
                        fullWidth
                        sx={{
                          my: 2
                        }}
                      >
                        <InputLabel id="select-province">
                          Tỉnh / Thành phố
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="select-province"
                          id="select-province"
                          label="Tỉnh / Thành phố"
                          name="province"
                          value={address.province}
                          onChange={handleChange}
                          // margin="normal"
                        >
                          <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                          <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                          {/* Thêm các thành phố khác tại đây */}
                        </Select>
                      </FormControl>
                      <FormControl
                        fullWidth
                        sx={{
                          mb: 2
                        }}
                      >
                        <InputLabel id="select-district">
                          Quận / Huyện
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="select-district"
                          id="select-district"
                          label="Quận/Huyện"
                          name="district"
                          value={address.district}
                          onChange={handleChange}
                          // margin="normal"
                        >
                          <MenuItem value="Quận 1">Quận 1</MenuItem>
                          <MenuItem value="Quận 2">Quận 2</MenuItem>
                          {/* Thêm các quận/huyện khác tại đây */}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="select-district">
                          Phường / Xã
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="select-ward"
                          id="select-ward"
                          label="Phường/Xã"
                          name="ward"
                          value={address.ward}
                          onChange={handleChange}
                          // margin="normal"
                        >
                          <MenuItem value="Phường 1">Phường 1</MenuItem>
                          <MenuItem value="Phường 2">Phường 2</MenuItem>
                          {/* Thêm các phường/xã khác tại đây */}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="Số nhà, tên đường"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="is_default"
                              checked={address.is_default}
                              onChange={handleChange}
                            />
                          }
                          label="Đặt làm địa chỉ mặc định"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 2 }}
                        >
                          Lưu lại
                        </Button>
                      </Stack>
                    </form>
                  </Box>
                </Modal>
              ) : null}
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
                onClick={() => setPaymentMethod("COD")} // Bấm vào box sẽ chọn "cod"
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
                  value="COD"
                  checked={paymentMethod === "COD"}
                  sx={{
                    color: "#4CAF50", // Màu khi không được chọn
                    "&.Mui-checked": {
                      color: "#4CAF50" // Màu khi được chọn
                    }
                  }}
                />
                <Typography>
                  COD
                  <Typography
                    variant="body2"
                    component={"span"}
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    Tiền mặt
                  </Typography>
                </Typography>
              </Box>

              {/* Box cho Ví VNPay */}
              <Box
                onClick={() => setPaymentMethod("QR_PAYMENT")} // Bấm vào box sẽ chọn "vnpay"
                sx={{
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", // Hiển thị con trỏ khi hover
                  backgroundColor:
                    paymentMethod === "QR_PAYMENT"
                      ? "rgba(76, 175, 80, 0.1)"
                      : "transparent" // Màu nền khi được chọn
                }}
              >
                <Radio
                  value="QR_PAYMENT"
                  checked={paymentMethod === "QR_PAYMENT"}
                  sx={{
                    color: "#4CAF50", // Màu khi không được chọn
                    "&.Mui-checked": {
                      color: "#4CAF50" // Màu khi được chọn
                    }
                  }}
                />
                <Typography>Chuyển khoản QR</Typography>
              </Box>
            </RadioGroup>
          </Box>

          <Box sx={{ borderRadius: "4px", p: 2, bgcolor: "#F5F5F5", mt: 5 }}>
            <TextField
              fullWidth
              label="Ghi chú"
              name="note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value)
              }}
              margin="normal"
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              onClick={toggleDrawer(true)}
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
            {/* Drawer hiển thị danh sách mã giảm giá */}
            <Drawer
              anchor="right"
              open={openDiscount}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  // width: 300, // Chiều rộng Drawer
                  borderRadius: "10px 0 0 10px" // Bo góc phía bên trái
                }
              }}
            >
              <Box sx={{ width: 360, p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Chọn mã giảm giá
                  </Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <Box
                  sx={{
                    flex: 1,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    pr: 1,
                    mb: 4
                  }}
                >
                  <RadioGroup
                    value={selectedVoucher}
                    onChange={(e) => setSelectedVoucher(Number(e.target.value))}
                  >
                    {vouchers.map((voucher) => (
                      <Stack
                        key={voucher.id}
                        direction="row"
                        alignItems="center"
                        sx={{
                          border: "1px solid #E0E0E0",
                          borderRadius: "8px",
                          mb: 2,
                          p: 2,
                          bgcolor:
                            selectedVoucher === voucher.id ? "#E3F2FD" : "white"
                        }}
                      >
                        <Box
                          sx={{
                            width: "6px",
                            height: "100%",
                            bgcolor:
                              selectedVoucher === voucher.id
                                ? "primary.main"
                                : "transparent",
                            borderRadius: "8px 0 0 8px"
                          }}
                        />

                        <Box sx={{ flex: 1, ml: 2 }}>
                          <Typography fontWeight="bold">
                            {voucher.content}
                          </Typography>
                          <Typography color="text.secondary">
                            Giảm {voucher.percent}%
                          </Typography>
                          <Typography color="text.secondary" fontSize={12}>
                            HSD: {formatDate(voucher.end_date)}
                          </Typography>
                        </Box>

                        <FormControlLabel
                          value={voucher.id}
                          control={<Radio />}
                          label=""
                        />
                      </Stack>
                    ))}
                  </RadioGroup>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleApply}
                  disabled={selectedVoucher === null}
                >
                  Áp dụng
                </Button>
              </Box>
            </Drawer>
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
                <Typography>{formattedAmount(totalPrice)}</Typography>
              </Stack>

              {/* Giảm giá ưu đãi */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography>Giảm giá</Typography>
                <Typography>{formattedAmount(discountAmount)}</Typography>
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
                  {formattedAmount(finalPrice)}
                </Typography>
              </Stack>

              {/* Nút Mua hàng */}
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
                onClick={handleSubmitOrder}
              >
                {`Thanh toán (${orderDetails.length})`}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Order
