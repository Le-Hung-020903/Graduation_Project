import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./slice/cartSlice"
import orderSlice from "./slice/orderSlice"
import notificationSlice from "./slice/notification"
import { userReducer } from "./slice/userSlice"

// Cấu hình persist
const rootPersistConfig = {
  key: "root", // key của persist do chsung ta chỉ định, mặc định là root
  storage: storage, // biến storage ở trên - lưu vào local storage
  whitelist: ["cart", "user"] // định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần f5
  //   blacklist: ['user'] // định nghĩa các slice dữ liệu KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5
}

// Combine các reducer trong dự án của chúng ta ở đây
const reducers = combineReducers({
  cart: cartSlice,
  user: userReducer,
  order: orderSlice,
  notification: notificationSlice
})

// thực hiện persist reducer
const persistReduxcer = persistReducer(rootPersistConfig, reducers)

// Cấu hình store Redux
const store = configureStore({
  // reducer: {
  //   cart: cartSlice
  // }
  reducer: persistReduxcer, // thêm persist reducer vào cấu hình store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
