"use client"
import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import StarIcon from "@mui/icons-material/Star"
import { IVariant } from "../_interfaces/product"
import { formattedAmount } from "../utils/formatMoney"

const active = {
  bgcolor: "#",
  color: "#FFFFFF"
}
interface IVariantsProp {
  data: IVariant[]
}

const Variants = ({ data }: IVariantsProp) => {
  const [variant, setVariant] = useState<IVariant | null>(null)
  // 📌 Hàm xử lý khi click vào biến thể
  const handleSelectVariant = (variant: IVariant) => {
    setVariant(variant)
  }
  // ✅ Chỉ set biến thể mặc định khi `data` có giá trị
  useEffect(() => {
    if (data.length > 0) {
      setVariant(data[0])
    }
  }, [data])

  // ✅ Nếu chưa có dữ liệu, không render tiếp
  if (!variant) return null
  return (
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
          {formattedAmount(variant.price)} VNĐ
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
        {data.map((item, index) => {
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
  )
}

export default Variants
