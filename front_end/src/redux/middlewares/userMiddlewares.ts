import { API_ROOT } from "@/app/utils/constants"
import authorizedAxiosInstance from "@/app/library/axios/interceptor"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const res = await authorizedAxiosInstance.post(
      `${API_ROOT}/auth/login`,
      data
    )
    return res.data.data
  }
)

export const loginUserGoogleAPI = createAsyncThunk(
  "user/loginUserGoogleAPI",
  async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/auth/profile`)
    return res.data.data
  }
)
