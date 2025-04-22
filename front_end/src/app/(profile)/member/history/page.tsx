import { cookies } from "next/headers"
import HistoryOrder from "@/app/_component/HistoryOrder"
import TotalOrder from "@/app/_component/TotalOrder"
import { getOrderUserAPI } from "@/app/api/apiwithserver"
import Box from "@mui/material/Box"
import React from "react"

const PageHistoryOrder = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const res = await getOrderUserAPI("All", accessToken ?? "")

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <TotalOrder />
      </Box>
      <HistoryOrder order={res.data} />
    </Box>
  )
}

export default PageHistoryOrder
