import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import React from "react"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid2"
import CardProduct from "./CardProduct"

const BestSeller = () => {
  const active = {
    bgcolor: "#FDF3D9",
    px: 2.4,
    py: 0.2,
    borderRadius: "4px",
    color: "primary.main"
  }
  return (
    <Box sx={{ mt: "102px" }}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 800, color: "primary.main" }}
          component={"h2"}
        >
          Bán chạy nhất
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            gap: "20px",
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: "600"
            }
          }}
        >
          <Typography color="#757577" sx={{ ...active }}>
            Tất cả sản phẩm
          </Typography>
          <Typography>Sản phẩm hữu cơ</Typography>
          <Typography>Rau tươi</Typography>
          <Typography>Trái cây tươi</Typography>
          <Typography>Thảo mộc tươi</Typography>
        </Stack>
      </Stack>
      <Box>
        <Grid container spacing={5} sx={{ mt: "130px" }}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </Grid>
      </Box>
    </Box>
  )
}

export default BestSeller
