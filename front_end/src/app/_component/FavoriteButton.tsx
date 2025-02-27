"use client"
import Stack from "@mui/material/Stack"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import React, { useState } from "react"
import Box from "@mui/material/Box"

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Box className="favorite-button" onClick={handleToggleFavorite}>
      <Stack
        direction={"row"}
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
        {!isFavorite ? (
          <FavoriteBorderIcon
            sx={{
              fontSize: "15px",
              lineHeight: "36px",
              color: "primary.main"
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{
              fontSize: "15px",
              lineHeight: "36px",
              color: "red"
            }}
          />
        )}
      </Stack>
    </Box>
  )
}

export default FavoriteButton
