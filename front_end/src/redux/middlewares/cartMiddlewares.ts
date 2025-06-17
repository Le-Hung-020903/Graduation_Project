import { deleteCartProductAPI } from "@/app/api/apiwithclient"
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
    const res = await authorizedAxiosInstance.patch(`/cart/${id}`, data)
    return res.data.data
  }
)
export const getCartAPI = createAsyncThunk("cart/getCartAPI", async () => {
  const res = await authorizedAxiosInstance.get(`/cart`)
  return res.data.data
})

export const deleteCartAPI = createAsyncThunk(
  "cart/deleteCartProductAPI",
  async (id: number) => {
    await deleteCartProductAPI(id)
    return id // trả về id vừa xoá
  }
)
