import { getNotificationAPI } from "@/app/api/apiwithclient"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getNotificationsMiddleware = createAsyncThunk(
  "notification/getNotificationAPI",
  async () => {
    const res = await getNotificationAPI()
    return res
  }
)
