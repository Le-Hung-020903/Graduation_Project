import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import React from "react"
import Image from "next/image"
import Grid from "@mui/material/Grid2"

const CookingInstructions = () => (
  <Box sx={{ mt: 15 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
      }}
    >
      <Typography
        sx={{
          fontSize: "15px"
        }}
      >
        Hãy bắt tay vào làm với những ý tưởng công thức của chúng tôi.
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          textDecoration: "underline",
          textUnderlineOffset: "5px",
          color: "primary.main",
          fontWeight: 600
        }}
      >
        Mua tất cả sản phẩm
      </Typography>
    </Box>
    <Grid container spacing={3} sx={{ mt: 7 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Image
          src="/images/Icon/book-01.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Logo website clean food"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Image
          src="/images/Icon/book-02.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Logo website clean food"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>
    </Grid>
  </Box>
)

export default CookingInstructions
