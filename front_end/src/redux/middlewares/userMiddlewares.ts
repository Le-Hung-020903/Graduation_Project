import authorizedAxiosInstance from "@/app/library/axios/interceptor"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const res = await authorizedAxiosInstance.post(`/auth/login`, data)
    return res.data.data
  }
)

export const loginUserGoogleAPI = createAsyncThunk(
  "user/loginUserGoogleAPI",
  async () => {
    const res = await authorizedAxiosInstance.get(`/auth/profile`)
    return res.data.data
  }
)
