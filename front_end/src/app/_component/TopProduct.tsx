import { cookies } from "next/headers"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import React from "react"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import CardProduct from "./CardProduct"
import { getProductList } from "../api/apiwithserver"
import { IProductListItem } from "../_interfaces/product"
import { Button } from "@mui/material"
import Link from "next/link"

async function TopProduct() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const data = await getProductList(1, 8, undefined, accessToken)
  const productList: IProductListItem[] = data?.data || []

  return (
    <Box sx={{ mt: 9 }}>
      <Typography
        component={"h2"}
        color="primary.main"
        sx={{
          fontWeight: "800",
          fontSize: "28px",
          lineHeight: "32px",
          textAlign: "center"
        }}
      >
        Sản phẩm hàng đầu
      </Typography>
      <Stack
        direction={"row"}
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          mt: "20px",
          "& a": {
            textDecoration: "none",
            color: "inherit"
          },
          "& .MuiTypography-root": {
            padding: "8px 16px", // Thêm padding cố định
            position: "relative", // Cần thiết cho pseudo-element
            transitionProperty: "color border-radius",
            transition: "color 0.2s ease", // Hiệu ứng mượt mà
            "&:hover": {
              backgroundColor: "#FFF8E1",
              cursor: "pointer",
              color: "primary.main", // Thay đổi màu khi hover
              fontWeight: "bold", // Thêm font-weight khi hover
              borderRadius: "999px"
            }
          }
        }}
      >
        <Link href={"/"}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              bgcolor: "#FFF8E1",
              borderRadius: "999px"
            }}
          >
            All Product
          </Typography>
        </Link>
        <Link href={"/products/thit-ca-hai-san"}>
          <Typography>Cá và hải sản</Typography>
        </Link>
        <Link href={"/products/rau-cu-qua"}>
          <Typography>Rau củ quả</Typography>
        </Link>
        <Link href={"/products/thuc-uong-dinh-duong"}>
          <Typography>Thức uống dinh dưỡng</Typography>
        </Link>
        <Link href={"/products/gia-vi-sach"}>
          <Typography>Gia vị sạch</Typography>
        </Link>
      </Stack>
      <Grid container spacing={3.5} sx={{ mt: "60px" }}>
        {productList.length > 0 ? (
          productList.map(
            (product) =>
              product && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <CardProduct product={product} />
                </Grid>
              )
          )
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ py: 4 }}>
              Không có sản phẩm nào
            </Typography>
          </Grid>
        )}
      </Grid>
      <Stack alignItems={"center"} mt={7}>
        <Link href={"/products"}>
          <Button variant="outlined">Xem tất cả sản phẩm</Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default TopProduct
