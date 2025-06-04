"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Badge from "@mui/material/Badge"
import Image from "next/image"
import AutoCompleteSearch from "./AutoCompleteSearch"
import Typography from "@mui/material/Typography"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/userSlice"
import Stack from "@mui/material/Stack"
import ModelNotification from "./ModelNotification"
import Person2Icon from "@mui/icons-material/Person2"
import { AppDispatch } from "@/redux/store"
import { loginUserGoogleAPI } from "@/redux/middlewares/userMiddlewares"

const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}
interface IAccessTokenProps {
  accessToken: string | undefined
}
const HeaderContent = ({ accessToken }: IAccessTokenProps) => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch<AppDispatch>()

  // Sau khi dẫn đến tranng đăng nhập google và tạo tk ở db thì
  // không tự dispatch để tạo user nên cần call api profile luôn ở đây
  React.useEffect(() => {
    if (accessToken) {
      dispatch(loginUserGoogleAPI())
    }
  }, [accessToken, dispatch])

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
        sx={{
          py: 1.5
        }}
      >
        <Link
          href={"/"}
          style={{
            cursor: "pointer"
          }}
        >
          <Box>
            <Image
              src="/images/Icon/Logo.png"
              width={100}
              height={32}
              alt="Logo website clean food"
            />
          </Box>
        </Link>
        <AutoCompleteSearch />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={4}
        >
          <ModelNotification />
          <Link href={"/cart"} style={{ textDecoration: "none" }}>
            <Box sx={{ ...flexCenter, gap: "4px", cursor: "pointer" }}>
              <Badge badgeContent={4} color="error">
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#EAF1EE",
                    ...flexCenter,
                    borderRadius: "8px 8px 20px 8px",
                    transition: "border-radius 0.3s ease",
                    "&:hover": {
                      borderBottomRightRadius: "8px"
                    }
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "primary.main" }} />
                </Box>
              </Badge>
            </Box>
          </Link>

          {user ? (
            <Link
              href={"/member"}
              style={{
                textDecoration: "none"
              }}
            >
              <Typography
                component={"h4"}
                sx={{
                  fontSize: "18px",
                  color: "#757577",
                  textTransform: "capitalize",
                  cursor: "pointer"
                }}
              >
                Hi. {user.name}
              </Typography>
            </Link>
          ) : (
            <Link href={"/login"} style={{ textDecoration: "none" }}>
              <Box sx={{ ...flexCenter, gap: "4px", cursor: "pointer" }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#EAF1EE",
                    ...flexCenter,
                    borderRadius: "8px 8px 20px 8px",
                    transition: "border-radius 0.3s ease",
                    "&:hover": {
                      borderBottomRightRadius: "8px"
                    }
                  }}
                >
                  <Person2Icon
                    sx={{
                      color: "primary.main"
                    }}
                  />
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    color: "#757577"
                  }}
                >
                  Đăng nhập
                </Typography>
              </Box>
            </Link>
          )}
        </Stack>
      </Stack>
      <Divider />
    </Box>
  )
}

export default HeaderContent
