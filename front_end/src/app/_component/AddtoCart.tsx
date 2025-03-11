"use client"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const AddtoCart = () => {
  const [quantity, setQuantity] = useState<number>(0)
  const handleAddQuantity = () => {
    setQuantity(quantity + 1)
  }
  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <Stack direction={"row"} spacing={2}>
      <Box>
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
      <Box>
        <Button variant="contained" sx={{ padding: "13px 80px" }}>
          THÊM VÀO GIỎ
        </Button>
      </Box>
    </Stack>
  )
}

export default AddtoCart
