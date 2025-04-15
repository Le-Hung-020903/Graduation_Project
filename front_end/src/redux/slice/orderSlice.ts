import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ICartProduct } from "@/app/_interfaces/cart"
interface IOrder {
  orderCode: string
  totalPrice: number
  orderItems: ICartProduct[]
}
const initialState: IOrder = {
  orderCode: "",
  totalPrice: 0,
  orderItems: []
}
const orderSlice = createSlice({
  name: "order",
  initialState,
  //reducer dong bo
  reducers: {
    setOrderItem: (state, action: PayloadAction<ICartProduct[]>) => {
      state.orderItems = action.payload
    },
    setOrder: (
      state,
      action: PayloadAction<{
        orderCode: string
        totalPrice: number
      }>
    ) => {
      state.orderCode = action.payload.orderCode
      state.totalPrice = action.payload.totalPrice
    },
    clearOrder: (state) => {
      state.orderCode = ""
      state.totalPrice = 0
    }
  }
})
export const { setOrder, clearOrder, setOrderItem } = orderSlice.actions
export const selectOrder = (state: RootState) => {
  return state.order
}
export const selectOrderItems = (state: RootState) => {
  return state.order.orderItems
}
export default orderSlice.reducer
