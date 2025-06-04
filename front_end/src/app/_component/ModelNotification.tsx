"use client"
import * as React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Chip from "@mui/material/Chip"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Button from "@mui/material/Button"
import Badge from "@mui/material/Badge"
import Stack from "@mui/material/Stack"
import { INotifications } from "../_interfaces/nnotifications"
import dayjs from "dayjs"
import { initSocket } from "../library/websocket/socket"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/userSlice"
import { IWebsocketOrder } from "../_interfaces/order"
import {
  addNotification,
  selectIsFetched,
  selectLengthNotification,
  selectNotifications
} from "@/redux/slice/notification"
import { AppDispatch } from "@/redux/store"
import { getNotificationsMiddleware } from "@/redux/middlewares/notificationMiddleware"

export default function ModelNotification() {
  const socket = initSocket()
  const user = useSelector(selectCurrentUser)
  console.log("🚀 ~ ModelNotification ~ user:", user)
  const dispatch = useDispatch<AppDispatch>()
  const notifications = useSelector(selectNotifications)
  const isFetched = useSelector(selectIsFetched)
  const lengthNotification = useSelector(selectLengthNotification)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  React.useEffect(() => {
    if (user && !isFetched) {
      dispatch(getNotificationsMiddleware())
    }
  }, [user, isFetched, dispatch])

  React.useEffect(() => {
    if (!user?.id) return

    const room = `user_${user.id}`

    if (socket.connected) {
      socket.emit("join_user_room", room)
    } else {
      socket.on("connection", () => {
        console.log("✅ socket connected")
        socket.emit("join_user_room", room)
      })
    }

    const handleNewOrderNotification = (order: IWebsocketOrder) => {
      console.log("📥 Nhận notify_user từ server day ne:", order)

      // const notification = {
      //   id: order.id,
      //   title: order.title,
      //   message: order.message,
      //   is_read: order.is_read,
      //   user_redirec_url: order.user_redirec_url,
      //   admin_redirec_url: null,
      //   created_at: order.created_at,
      //   receiver_role: "USER" as const
      // }

      // dispatch(addNotification(notification))
    }

    socket.on("notify_user", handleNewOrderNotification)

    return () => {
      socket.off("notify_user", handleNewOrderNotification)
    }
  }, [user?.id, dispatch, socket])

  return (
    <Box>
      <Stack
        onClick={(e) => handleClick(e)}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          gap: "4px",
          cursor: "pointer",
          position: "relative"
        }}
      >
        <Badge badgeContent={lengthNotification} color="error">
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: 50,
              height: 50,
              bgcolor: "#EAF1EE",
              transition: "border-radius 0.3s ease",
              borderRadius: "8px 8px 20px 8px",
              "&:hover": {
                borderBottomRightRadius: "8px"
              }
            }}
          >
            <NotificationsIcon sx={{ color: "primary.main" }} />
          </Stack>
        </Badge>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <Box sx={{ p: 2, maxWidth: "300px" }}>
          <Typography variant="body1">Thông báo</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 1,
              "& .MuiChip-label": {
                cursor: "pointer"
              }
            }}
          >
            <Chip
              label="Tất cả"
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
            <Chip
              label="Chưa đọc"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          </Stack>
          <Box
            sx={{
              mt: 2,
              "& > .MuiBox-root": {
                cursor: "pointer"
              }
            }}
          >
            {notifications && notifications.length > 0 ? (
              notifications?.map((item: INotifications) => {
                return (
                  <Box
                    key={item.id}
                    sx={{
                      mt: 1,
                      p: 1,
                      bgcolor: `${item.is_read ? "" : "#e0e0e0"}`,
                      borderRadius: 3,
                      border: "1px solid #e0e0e0",
                      position: "relative",
                      "&:hover .MuiBox-root": {
                        display: "block"
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "none",
                        position: "absolute",
                        top: "50%",
                        right: "1%",
                        transform: "translateY(-50%) rotate(90deg)"
                      }}
                    >
                      <Tooltip title="Xoá thông báo">
                        <IconButton
                          aria-label="more options"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">{item.title}</Typography>
                      <Typography
                        component={"span"}
                        sx={{
                          fontSize: "13px"
                        }}
                      >
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        mt: 0.6
                      }}
                    >
                      {item.message}
                    </Typography>
                  </Box>
                )
              })
            ) : (
              <Typography variant="body1" my={4}>
                Chưa có thông báo mới !
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              mt: 2.5
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                borderRadius: 2
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Xem thông báo trước
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
