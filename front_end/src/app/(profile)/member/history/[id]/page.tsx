import { cookies } from "next/headers"
import OrderDetail from "@/app/_component/OrderDetail"
import { getOrderDetailAPI } from "@/app/api/apiwithserver"
import Box from "@mui/material/Box"
import React from "react"

interface PageProps {
  params: Promise<{ id: string }>
}
const PageOrderdetail = async ({ params }: PageProps) => {
  const { id } = await params
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const res = await getOrderDetailAPI(Number(id), accessToken ?? "")

  return (
    <Box>
      <OrderDetail orderDetail={res.data} />
    </Box>
  )
}

export default PageOrderdetail
