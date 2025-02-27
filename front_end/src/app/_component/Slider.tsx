import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"

const Slider = () => {
  return (
    <Box
      sx={{
        mt: "10px"
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image
          src="/images/Icon/slider.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Logo website clean food"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  )
}

export default Slider
