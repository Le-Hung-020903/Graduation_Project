import authorizedAxiosInstance from "../library/axios/interceptor"
import { API_ROOT } from "../utils/constants"
import { toast } from "react-toastify"

// USER
export const registerUserAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/user/create`,
    data
  )
  return res.data
}
