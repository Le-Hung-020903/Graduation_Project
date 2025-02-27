import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import React from "react"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid2"
import CardProduct from "./CardProduct"

const active = {
  color: "primary.main",
  bgcolor: "#FDF3D9",
  px: 2.4,
  py: 0.2,
  borderRadius: "4px"
}
const TopProduct = () => {
  return (
    <Box sx={{ mt: "20px" }}>
      <Typography
        component={"h2"}
        color="primary.main"
        sx={{
          fontWeight: "800",
          fontSize: "24px",
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
          "& .MuiTypography-root": {
            cursor: "pointer"
          }
        }}
      >
        <Typography>All Product</Typography>
        <Typography
          sx={{
            ...active
          }}
        >
          Cá và hải sản
        </Typography>
        <Typography>Hạt dinh dưỡng</Typography>
        <Typography>Ngũ cốc</Typography>
        <Typography>Sữa</Typography>
      </Stack>
      <Grid container spacing={5} sx={{ mt: "60px" }}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </Grid>
    </Box>
  )
}

export default TopProduct
