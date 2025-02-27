import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import React from "react"
import Paper from "@mui/material/Paper"
import Image from "next/image"

const Discount = () => {
  return (
    <Box sx={{ mt: "35px", width: "100%" }}>
      <Grid container spacing={2}>
        {/* Grid Item 1 */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={1} sx={{ padding: 1, textAlign: "center" }}>
            <Image
              src="/images/Icon/discount-01.png"
              alt="Tra cứu đơn hàng"
              width={0}
              height={0}
              sizes="100vw" // Đảm bảo ảnh chiếm 100% chiều ngang
              style={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>

        {/* Grid Item 2 */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={1} sx={{ padding: 1, textAlign: "center" }}>
            <Image
              src="/images/Icon/discount-01.png"
              alt="Tra cứu đơn hàng"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>

        {/* Grid Item 3 */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={1} sx={{ padding: 1, textAlign: "center" }}>
            <Image
              src="/images/Icon/discount-01.png"
              alt="Tra cứu đơn hàng"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Discount
