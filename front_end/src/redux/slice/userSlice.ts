import { IUser } from "@/app/_interfaces/user"
import {
  loginUserAPI,
  loginUserGoogleAPI
} from "@/redux/middlewares/userMiddlewares"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { toast } from "react-toastify"
import { RootState } from "../store"

interface IUserState {
  currentUser: IUser | null
}
const initialState: IUserState = {
  currentUser: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,

  //reducer dong bo
  reducers: {},

  // extraReducers noi xu ly data bat dog bo
  extraReducers: (builder) => {
    builder.addCase(
      loginUserAPI.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.currentUser = action.payload
      }
    )
    builder.addCase(
      loginUserGoogleAPI.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.currentUser = action.payload
      }
    )
  }
})

export const selectCurrentUser = (state: RootState) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
