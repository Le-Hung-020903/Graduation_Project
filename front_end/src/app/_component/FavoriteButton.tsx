"use client"
import Stack from "@mui/material/Stack"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import {
  createFavoriteProduct,
  deleteFavoriteProduct
} from "../api/apiwithclient"
import { toast } from "react-toastify"

const FavoriteButton = ({
  isFavorite,
  productId
}: {
  isFavorite: boolean
  productId: number
}) => {
  const [FavoriteProduct, setFavoriteProduct] = useState<boolean>(isFavorite)

  const handleSubmitFavorite = (event: React.MouseEvent) => {
    event.stopPropagation() // Ngăn sự kiện lan đến thẻ cha (Link)
    event.preventDefault() // Ngăn Link tự động chuyển trang

    const newValue = !FavoriteProduct
    setFavoriteProduct(newValue)
    if (newValue) {
      toast.promise(createFavoriteProduct(productId), {}).then((res) => {
        if (res.success) toast.success(`${res.message}`)
      })
    } else {
      toast.promise(deleteFavoriteProduct(productId), {}).then((res) => {
        if (res.success) toast.success(`${res.message}`)
      })
    }
  }

  return (
    <Box
      className="interceptor-loading favorite-button"
      onClick={handleSubmitFavorite}
    >
      <Stack
        direction="row"
        sx={{
          width: "36px",
          height: "36px",
          bgcolor: "#EDEEEF",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          cursor: "pointer"
        }}
      >
        {FavoriteProduct ? (
          <FavoriteIcon
            sx={{
              fontSize: "15px",
              lineHeight: "36px",
              color: "red"
            }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{
              fontSize: "15px",
              lineHeight: "36px",
              color: "primary.main"
            }}
          />
        )}
      </Stack>
    </Box>
  )
}

export default FavoriteButton
