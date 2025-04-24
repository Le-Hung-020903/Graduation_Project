"use client"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import React, { useMemo, useState } from "react"
import Button from "@mui/material/Button"
import { IOrderResponse } from "../_interfaces/order"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Link from "next/link"
import Image from "next/image"
import Paper from "@mui/material/Paper"
import { formattedAmount } from "../utils/formatMoney"
import dayjs from "dayjs"

type OrderStatus = "All" | "PENDING" | "CONFIRMED" | "WAITING_CONFIRMATION"

interface ordersProps {
  order: IOrderResponse[]
}

const HistoryOrder = ({ order }: ordersProps) => {
  const [currentFilter, setCurrentFilter] = useState<OrderStatus>("All")

  const statusButtons: { status: OrderStatus; label: string }[] = [
    { status: "All", label: "Tất cả" },
    { status: "PENDING", label: "Chưa thanh toán" },
    { status: "WAITING_CONFIRMATION", label: "Chờ xác nhận (COD)" },
    { status: "CONFIRMED", label: "Thành công" }
  ]

  const handleFilterChange = async (status: OrderStatus) => {
    setCurrentFilter(status)
  }

  const filterOrders = useMemo(() => {
    if (currentFilter === "All") return order
    return order.filter((item) => item.status === currentFilter)
  }, [currentFilter, order])

  return (
    <Box
      sx={{
        mt: 5
      }}
    >
      <Stack direction={"row"} spacing={2}>
        {statusButtons.map(({ status, label }) => (
          <Box key={status}>
            <Button
              variant={currentFilter === status ? "contained" : "outlined"}
              onClick={() => handleFilterChange(status)}
            >
              {label}
            </Button>
          </Box>
        ))}
      </Stack>
      <Box>
        {filterOrders.map((item, index) => {
          return (
            <Paper key={index + 1} elevation={3} sx={{ mt: 4, p: 3 }}>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      width: "130px",
                      height: "130px",
                      overflow: "hidden",
                      borderRadius: "10px",
                      flexShrink: 0, // Ngăn không cho ảnh co lại,
                      mr: 5
                    }}
                  >
                    <Image
                      src={item.product.images.url}
                      alt=""
                      width={130}
                      height={130}
                    />
                  </Box>
                  <Stack
                    justifyContent="space-between"
                    height="100%"
                    alignItems=""
                  >
                    <Link
                      href={""}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ fontSize: "18px" }}
                      >
                        {item.product.name}
                      </Typography>
                    </Link>

                    {!!item.more && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        {item.more}
                      </Typography>
                    )}

                    {/* <Chip label="Chờ xác nhận" color="default" /> */}
                    <Chip
                      label={item.status}
                      color="success"
                      sx={{ maxWidth: "120px" }}
                    />
                    <Typography sx={{ mt: 3.5 }}>
                      {formattedAmount(item.final_price)}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Stack
                    justifyContent="space-between"
                    height="100%"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(item.created_at, "DD/MM/YYYY HH:mm").format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </Typography>
                    <Link
                      href={`/member/history/${item.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button variant="outlined">Xem chi tiết</Button>
                    </Link>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          )
        })}
      </Box>
    </Box>
  )
}

export default HistoryOrder
