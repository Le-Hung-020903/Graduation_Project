"use client"
import { selectCurrentUser } from "@/redux/slice/userSlice"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import React, { useRef } from "react"
import EditIcon from "@mui/icons-material/Edit"
import { useSelector } from "react-redux"
import Link from "next/link"
import Input from "@mui/material/Input"

const PageAccount = () => {
  const user = useSelector(selectCurrentUser)
  const textFieldRef = useRef<HTMLInputElement>(null)
  const handleFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus()
    }
  }
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          my: 4,
          textTransform: "capitalize",
          textAlign: "center"
        }}
      >
        {user?.name}
      </Typography>
      <Stack
        sx={{
          margin: "auto",
          width: "70%"
        }}
      >
        <Stack
          sx={{
            position: "relative"
          }}
        >
          <TextField
            id="standard-basic"
            label={`Họ và tên: ${user?.name}`}
            variant="standard"
            inputRef={textFieldRef}
          />
          <EditIcon
            sx={{
              position: "absolute",
              cursor: "pointer",
              right: "3px",
              top: "17px"
            }}
            onClick={handleFocus}
          />
        </Stack>
        <TextField
          id="standard-basic"
          label={`Email: ${user?.email}`}
          variant="standard"
          disabled
          sx={{
            mt: 3
          }}
        />

        <TextField
          id="standard-basic"
          label={`Số điện thoại: ${user?.phone}`}
          variant="standard"
          disabled
          sx={{
            mt: 3
          }}
        />
        <Link href="/member/change-password" passHref>
          <Box
            sx={{
              mt: 5,
              width: "100%",
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                "&:after": {
                  borderBottom: "2px solid rgba(0, 0, 0, 0.42)"
                }
              },
              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                transition: "border-bottom 0.3s ease"
              }
            }}
          >
            <Input
              value="Địa chỉ"
              readOnly
              fullWidth
              disableUnderline
              sx={{
                pointerEvents: "none",
                "& input": {
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, 0.6)"
                }
              }}
            />
          </Box>
        </Link>
        <Link href="/member/change-password" passHref>
          <Box
            sx={{
              mt: 5,
              width: "100%",
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                "&:after": {
                  borderBottom: "2px solid rgba(0, 0, 0, 0.42)"
                }
              },
              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                transition: "border-bottom 0.3s ease"
              }
            }}
          >
            <Input
              value="Đổi mật khẩu"
              readOnly
              fullWidth
              disableUnderline
              sx={{
                pointerEvents: "none",
                "& input": {
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, 0.6)"
                }
              }}
            />
          </Box>
        </Link>
      </Stack>
    </Box>
  )
}

export default PageAccount
