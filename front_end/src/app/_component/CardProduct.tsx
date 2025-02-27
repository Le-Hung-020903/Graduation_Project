import Grid from "@mui/material/Grid2"
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

const CardProduct = () => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Box
        sx={{
          position: "relative",
          border: "1px solid #E2E3E4",
          borderRadius: "16px",
          overflow: "hidden",
          // transition: "padding-bottom 0.3s ease",
          paddingBottom: "0px",
          transition: "box-shadow 0.3s ease",

          "&:hover": {
            // paddingBottom: "15px",
            boxShadow: "0 0 0 1px #EEC73E", // Sử dụng outline thay vì border
            overflow: "hidden",
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
          <CardMedia
            component="img"
            alt="Ảnh sản phẩm"
            height="200"
            image="images/Icon/pumpkin.png"
            sx={{ p: 2, mt: "24px" }}
          />
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              mt: "57px",
              mb: "35px"
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
                  Đồ uống
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "16px"
                  }}
                >
                  Ví Cotton Trơn
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
                    Kg
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
                  100.000
                  <Typography
                    component="span"
                    color="primary.main"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "20px"
                    }}
                  >
                    VND
                  </Typography>
                </Typography>
              </Stack>
            </CardContent>
            <CardActions sx={{ mr: "15px" }}>
              {/* Button hãy để thành useClient để có thể làm các sự kiện */}
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
                  minWidth: "40px", // Xóa min-width mặc định của Button
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
                transition: " 0.3s ease"
              }}
            >
              <FavoriteButton />
            </Box>
          </Stack>
        </Card>
      </Box>
    </Grid>
  )
}

export default CardProduct
