import Box from "@mui/material/Box"
import React from "react"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Stack from "@mui/material/Stack"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import Typography from "@mui/material/Typography"
import FavoriteButton from "./FavoriteButton"
import { IProductListItem } from "../_interfaces/product"
import Link from "next/link"
import { formattedAmount } from "../utils/formatMoney"

interface CardProductProps {
  product: IProductListItem
}
type PageProps = {
  params: Promise<{ product: IProductListItem }>
}
export const generateMetadata = async ({ params }: PageProps) => {
  const { product } = await params
  return {
    title: product.name,
    description: `${product.name} product details`
  }
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  if (!product) return null

  const { name, images, category, variants, slug } = product
  const price = variants?.[0]?.price || 0
  const unitSymbol = variants?.[0]?.unit?.symbol || ""

  return (
    <Link
      href={`/${slug}`}
      style={{
        textDecoration: "none"
      }}
    >
      <Box
        sx={{
          position: "relative",
          paddingBottom: "0px",
          transition: "box-shadow 0.3s ease",
          width: "100%", // ⚠️ Bắt buộc
          minWidth: 0, // ⚠️ Quan trọng: Fix overflow MUI
          display: "flex",
          flexDirection: "column",
          border: "1px solid #E2E3E4",
          borderRadius: "16px",
          overflow: "hidden",

          "&:hover": {
            boxShadow: "0 0 0 1px #EEC73E",
            cursor: "pointer"
          },
          "&:hover .box-favorite-button": {
            display: "block"
          },
          "&:hover .add-to-cart": {
            bgcolor: "#EEC73E"
          },
          "&:hover .add-to-cart svg": {
            color: "black"
          }
        }}
      >
        <Card>
          <Box
            sx={{
              height: 200, // Cố định chiều cao
              width: "100%", // Chiếm toàn bộ chiều rộng
              display: "flex",
              alignItems: "center", // Canh giữa theo chiều dọc
              justifyContent: "center", // Canh giữa theo chiều ngang
              p: 2
            }}
          >
            <CardMedia
              component="img"
              alt={name}
              image={`${images?.[0]?.url ? images?.[0]?.url : ""}`}
              sx={{
                p: 2,
                mt: "24px",
                objectFit: "cover",
                width: "100%",
                height: "100%"
              }}
            />
          </Box>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              mt: "57px",
              mb: "35px",
              flexGrow: 1
            }}
          >
            <CardContent sx={{ py: 1 }}>
              <Stack spacing={0.5}>
                <Typography
                  component="span"
                  color="#EEC73E"
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "16px"
                  }}
                >
                  {category?.name || "Không xác định"}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "16px"
                  }}
                >
                  {name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography
                    color="#A0A1A2"
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px"
                    }}
                  >
                    Đơn giá:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px"
                    }}
                  >
                    {unitSymbol}
                  </Typography>
                </Stack>
                <Typography
                  component="p"
                  color="primary.main"
                  sx={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "20px"
                  }}
                >
                  {formattedAmount(price)}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions sx={{ mr: "15px" }}>
              <Button
                className="add-to-cart"
                variant="contained"
                startIcon={
                  <ShoppingBagIcon
                    fontSize="large"
                    sx={{
                      marginLeft: "3.5px",
                      color: "#A0A1A2"
                    }}
                  />
                }
                sx={{
                  bgcolor: "#EDEEEF",
                  height: "40px",
                  borderRadius: "7px",
                  width: "40px",
                  p: 0,
                  minWidth: "40px",
                  borderBottomRightRadius: "18px",
                  transition: "border-radius 0.3s ease",
                  "&:hover": {
                    borderBottomRightRadius: "7px"
                  },
                  "& .MuiButton-icon": {
                    display: "flex",
                    alignItems: "center",
                    marginRight: 0,
                    justifyContent: "center"
                  }
                }}
              />
            </CardActions>
            <Box
              className="box-favorite-button"
              sx={{
                display: "none",
                position: "absolute",
                top: "20px",
                right: "14px",
                transition: "0.3s ease"
              }}
            >
              <FavoriteButton
                isFavorite={product.isFavorite}
                productId={product.id}
              />
            </Box>
          </Stack>
        </Card>
      </Box>
    </Link>
  )
}

export default CardProduct
