"use client"
import React from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import CloseIcon from "@mui/icons-material/Close"
import Stack from "@mui/material/Stack"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import { Avatar, IconButton, TextField, Typography, Zoom } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { getChatbotResponseAPI } from "../api/apiwithclient"
// import ChatLoading from "./Loading"
import DOMPurify from "dompurify"
import "../../../public/style/chatbot.css"

interface IMessages {
  from: "bot" | "user"
  text: string
}
const Chatbot = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [messages, setMessages] = React.useState<IMessages[]>([
    {
      from: "bot",
      text: "Chào bạn! Tôi là Minh Anh Bot, có thể giúp gì cho bạn hôm nay? 😊"
    }
  ])
  const [input, setInput] = React.useState<string>("")

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages([...messages, { from: "user", text: input }])
    setInput("")

    // gọi API AI tại đây để nhận phản hồi và cập nhật messages
    setMessages((pre) => [
      ...pre,
      {
        from: "bot",
        text: "Đang suy nghĩ... 🤔"
      }
    ])
    try {
      const res = await getChatbotResponseAPI(input)
      setMessages((pre) => {
        const updated = [...pre]
        updated.pop() /// xoá tin nhắn "Đang suy nghĩ..."
        return [...updated, { from: "bot", text: res.data }]
      })
    } catch {
      setMessages((pre) => {
        const updated = [...pre]
        updated.pop() /// xoá tin nhắn "Đang suy nghĩ..."
        return [
          ...updated,
          { from: "bot", text: "Lỗi kết nối, vui lòng thử lại sau." }
        ]
      })
    }
  }
  return (
    <Box>
      {open && (
        <Zoom in={open} timeout={500}>
          <Paper
            elevation={6}
            sx={{
              position: "fixed",
              bottom: 120,
              right: 45,
              width: 400,
              height: 500,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={1.7}
              bgcolor="#f1f1f1"
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar alt="Chatbot" src="/bot-avatar.png" />
                <Box>
                  <Typography fontWeight="bold">Minh Anh Bot</Typography>
                  <Typography variant="caption" color="green">
                    Đang hoạt động
                  </Typography>
                </Box>
              </Stack>
              <Stack>
                <IconButton onClick={() => setOpen((prev) => !prev)}>
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            {/* Messages */}
            <Box
              p={2}
              flex={1}
              sx={{
                overflow: "auto"
              }}
            >
              <Stack spacing={2}>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    alignSelf={msg.from === "bot" ? "flex-start" : "flex-end"}
                    bgcolor={msg.from === "bot" ? "#eee" : "#d1e7ff"}
                    p={1.5}
                    borderRadius={2}
                    sx={{
                      maxWidth: "80%"
                    }}
                  >
                    {msg.from === "bot" ? (
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(msg.text)
                        }}
                      />
                    ) : (
                      <Typography variant="body2">{msg.text}</Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Input */}
            <Stack
              direction={"row"}
              p={2}
              spacing={1}
              alignItems={"center"}
              borderTop={"1px solid #ccc"}
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSend()
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 20
                  }
                }}
              />
              <IconButton onClick={handleSend} sx={{ ml: 1 }}>
                <SendIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Zoom>
      )}
      <Box
        onClick={() => {
          setOpen((prev) => !prev)
        }}
        sx={{
          cursor: "pointer",
          position: "fixed",
          bottom: 30,
          right: 35,
          zIndex: 1000,
          width: 60,
          height: 60,
          borderRadius: "50%",
          "& .ripple": {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            transform: "translate(-50%, -50%)",
            opacity: 0.5,
            animation: "pulseAnimation 3s ease-out infinite"
          },
          "& .ripple:nth-of-type(1)": {
            animationDelay: "0s"
          },
          "& .ripple:nth-of-type(2)": {
            animationDelay: "1.5s"
          },
          "@keyframes pulseAnimation": {
            "0%": {
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 0.5
            },
            "100%": {
              transform: "translate(-50%, -50%) scale(2.5)",
              opacity: 0
            }
          }
        }}
      >
        {/* Sóng lan tỏa */}
        <Box className="ripple" />
        <Box className="ripple" />
        {/* Nút chat */}
        <IconButton
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "primary.main",
            color: "#fff",
            borderRadius: "50%",
            transform: open ? "rotate(360deg)" : "rotate(0deg)",
            transition: "transform 0.4s ease",
            "&:hover": {
              backgroundColor: "#169d52"
            }
          }}
        >
          {open ? <CloseIcon /> : <ChatBubbleIcon />}
        </IconButton>
      </Box>
    </Box>
  )
}

export default Chatbot
