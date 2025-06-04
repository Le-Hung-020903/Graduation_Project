import Box from "@mui/material/Box"
import React from "react"
import SwiperComemt from "./SwiperComemt"
import Grid from "@mui/material/Grid2"
import { getHighlightCommentAPI } from "../api/apiwithserver"

const Comments = async () => {
  const fetchCommemt = await getHighlightCommentAPI()
  return (
    <Box sx={{ mt: "140px" }}>
      <Grid
        container
        sx={{ width: "50%", margin: "auto", position: "relative" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SwiperComemt data={fetchCommemt.data} />
      </Grid>
    </Box>
  )
}

export default Comments
