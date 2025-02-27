import Box from "@mui/material/Box"
import React from "react"
import SwiperComemt from "./SwiperComemt"
import { IComments } from "../_interfaces/comment"
import Grid from "@mui/material/Grid2"

const Comments = () => {
  const comment: IComments[] = [
    {
      id: 1,
      content:
        "Tôi cũng thích việc có thể lấy đồ dùng ghim trong các gói giấy màu nâu và hộp thủy tinh tại khu vực không rác thải, với ý tưởng giảm thiểu nhựa và cũng tiện lợi hơn.",
      user: "Hung",
      avatar: `https://i.pravatar.cc/150?img=1`
    },
    {
      id: 2,
      content:
        "Tôi cũng thích việc có thể lấy đồ dùng ghim trong các gói giấy màu nâu và hộp thủy tinh tại khu vực không rác thải, với ý tưởng giảm thiểu nhựa và cũng tiện lợi hơn.",
      user: "Trinh",
      avatar: `https://i.pravatar.cc/150?img=2`
    },
    {
      id: 3,
      content:
        "Tôi cũng thích việc có thể lấy đồ dùng ghim trong các gói giấy màu nâu và hộp thủy tinh tại khu vực không rác thải, với ý tưởng giảm thiểu nhựa và cũng tiện lợi hơn.",
      user: "Nam",
      avatar: `https://i.pravatar.cc/150?img=3`
    }
  ]
  return (
    <Box sx={{ mt: "140px" }}>
      <Grid
        container
        sx={{ width: "50%", margin: "auto", position: "relative" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SwiperComemt data={comment} />
      </Grid>
    </Box>
  )
}

export default Comments
