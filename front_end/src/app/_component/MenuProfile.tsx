import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import HistoryIcon from "@mui/icons-material/History"
import PersonIcon from "@mui/icons-material/Person"
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import RateReviewIcon from "@mui/icons-material/RateReview"
import Box from "@mui/material/Box"
const active = {
  borderRadius: "8px",
  border: "1px solid #016433",
  backgroundColor: "#BAFFDD",
  color: "#016433"
}
const MenuProfile = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f1fff9",
        padding: "10px",
        borderRadius: "5px",
        height: "100vh"
      }}
    >
      <List
        sx={{
          "& .MuiListItem-root": {
            cursor: "pointer"
          }
        }}
      >
        <ListItem
          sx={{
            ...active
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Lịch sử mua hàng" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Tài khoản của bạn" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneForwardedIcon />
          </ListItemIcon>
          <ListItemText primary="Hỗ trợ" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Góp ý - Phản hồi" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Thoát tài khoản" />
        </ListItem>
      </List>
    </Box>
  )
}

export default MenuProfile
