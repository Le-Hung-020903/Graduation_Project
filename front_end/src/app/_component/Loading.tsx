"use client"
import React from "react"
import Box from "@mui/material/Box"

const ChatLoading = () => {
  return (
    <Box
      sx={{
        width: "3em",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component="span"
          sx={{
            width: "0.4em",
            height: "0.4em",
            borderRadius: "50%",
            backgroundColor: "black",
            animation: "fade 0.8s ease-in-out alternate infinite",
            animationDelay: `${-0.4 + i * 0.2}s`,
            "@keyframes fade": {
              from: { opacity: 1 },
              to: { opacity: 0 }
            }
          }}
        />
      ))}
    </Box>
  )
}

export default ChatLoading
