import React from "react"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const TotalOrder = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "6px",
        p: 4,
        mt: 6
      }}
    >
      <Stack sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "bold"
          }}
        >
          7
        </Typography>
        <Typography>đơn hàng</Typography>
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "black"
        }}
      />
      <Stack sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "bold"
          }}
        >
          4M
        </Typography>
      </Stack>
    </Stack>
  )
}

export default TotalOrder
