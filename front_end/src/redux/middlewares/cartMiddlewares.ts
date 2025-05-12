import authorizedAxiosInstance from "@/app/library/axios/interceptor"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createCatAPI = createAsyncThunk(
  "cart/createCartAPI",
  async (data) => {
    const res = await authorizedAxiosInstance.post(`/cart/create`, data)
    return res.data.data
  }
)
export const updateCartAPI = createAsyncThunk(
  "cart/updateCartAPI",
  async ({ id, data }: { id: number; data: any }) => {
    console.log("📌 Dữ liệu gửi lên API:", data)
    console.log("📌 Dữ liệu gửi lên API:", id)
    const res = await authorizedAxiosInstance.patch(`/cart/${id}`, data)
    return res.data.data
  }
)
export const getCartAPI = createAsyncThunk("cart/getCartAPI", async () => {
  const res = await authorizedAxiosInstance.get(`/cart`)
  return res.data.data
})
