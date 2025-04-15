"use client"
import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import StarIcon from "@mui/icons-material/Star"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Button from "@mui/material/Button"
import { formattedAmount } from "../utils/formatMoney"
import { IProduct, IVariant } from "../_interfaces/product"
import { toast } from "react-toastify"
import { createCartAPI } from "../api/apiwithclient"
import Link from "next/link"

interface IVariantsProp {
  data: IProduct
}

const Variants = ({ data }: IVariantsProp) => {
  const [variant, setVariant] = useState<IVariant | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const handleAddQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  // 📌 Hàm xử lý khi click vào biến thể
  const handleSelectVariant = (variant: IVariant) => {
    setVariant(variant)
  }

  useEffect(() => {
    if (variant) setTotal(quantity * variant.price)
  }, [quantity, variant])

  // ✅ Chỉ set biến thể mặc định khi `data` có giá trị
  useEffect(() => {
    if (data.variants.length > 0) {
      setVariant(data.variants[0])
    }
  }, [data.variants])

  const handleSubmit = () => {
    const cart_product: {
      quantity: number
      product_id: number
      variant_id: number
      price: number
    } = {
      quantity,
      product_id: data.id,
      variant_id: variant?.id ? variant?.id : 0,
      price: total
    }
    toast.promise(createCartAPI(cart_product), {}).then((res) => {
      if (res.success) toast.success("Thêm giỏ hàng thành công")
    })
  }
  // ✅ Nếu chưa có dữ liệu, không render tiếp
  if (!variant) return null

  return (
    <Box>
      <Box>
        <Typography>SKU: {variant.sku}</Typography>
        <Box
          sx={{
            mt: "10px",
            "& .MuiSvgIcon-root": {
              color: "#fcaf17"
            }
          }}
        >
          <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography
            component={"p"}
            sx={{
              fontSize: "30px",
              fontWeight: "800",
              lineHeight: "28px",
              color: "primary.main"
            }}
          >
            {formattedAmount(variant.price)}
          </Typography>
        </Box>
        <Box sx={{ mt: "28px" }}>
          <Typography
            component={"p"}
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px"
            }}
          >
            Nơi mua những thực phẩm bổ dưỡng nhất cho gia đình, bạn bè và người
            thân cùng trải nghiệm
          </Typography>
        </Box>
        <Stack direction={"row"} sx={{ my: "28px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#757577"
            }}
          >
            Đơn vị :
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#1D1D1F",
              ml: "5px"
            }}
          >
            {variant.unit.name}
          </Typography>
        </Stack>
        <Stack spacing={2} direction={"row"} sx={{ mb: 4 }}>
          {data.variants.map((item, index) => {
            return (
              <Box
                key={index + 1}
                sx={{
                  minWidth: "40px",
                  minHeight: "40px",
                  p: 1,
                  border: "1px solid #B5DDBA",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: variant.id === item.id ? "#128447" : "",
                  color: variant.id === item.id ? "#ffffff" : "",
                  "&:hover": {
                    border: "1px solid #128447"
                  }
                }}
                onClick={() => handleSelectVariant(item)}
              >
                {item.name}
              </Box>
            )
          })}
        </Stack>
      </Box>
      <Box>
        <Stack direction={"row"} spacing={2}>
          <Box sx={{ flexShrink: 0 }}>
            <Stack
              direction={"row"}
              sx={{
                border: "1px solid #E2E3E4"
              }}
            >
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  bgcolor: "#E2E3E4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                onClick={handleRemoveQuantity}
              >
                <RemoveIcon />
              </Box>
              <Box
                sx={{
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography component={"p"}>{quantity}</Typography>
              </Box>
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  bgcolor: "#E2E3E4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                onClick={handleAddQuantity}
              >
                <AddIcon />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                whiteSpace: "nowrap", // Ngăn không cho chữ xuống dòng
                minWidth: "max-content", // Đảm bảo nút không bị co lại quá mức
                padding: "13px 0px", // Padding hợp lý
                width: "100%"
              }}
            >
              THÊM VÀO GIỎ
            </Button>
          </Box>
        </Stack>
        <Box
          sx={{
            mt: 2
          }}
        >
          <Link href={"/cart"}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                p: 1.5
              }}
            >
              Mua ngay
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Variants
