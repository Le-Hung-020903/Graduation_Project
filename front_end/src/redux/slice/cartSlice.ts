import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  deleteCartAPI,
  // createCatAPI,
  getCartAPI,
  updateCartAPI
} from "../middlewares/cartMiddlewares"
import { ICart, ICartProduct, ICartUpdate } from "@/app/_interfaces/cart"
import { RootState } from "../store"

interface ICartSlice {
  cartId: number | null // Lưu ID của giỏ hàng
  items: ICartProduct[] /// Lưu danh sách sản phẩm trong giỏ hàng
}

const initialState: ICartSlice = {
  cartId: null,
  items: []
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      getCartAPI.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.cartId = action.payload.id // Lưu ID của giỏ hàng
        state.items = action.payload.cartProducts.map((item) => ({
          ...item,
          variantSelected: item.variantSelected
        }))
      }
    )
    builder.addCase(
      updateCartAPI.fulfilled,
      (state, action: PayloadAction<ICartUpdate>) => {
        const { id, quantity, price } = action.payload // Sản phẩm vừa cập nhật
        const item = state.items.find((item) => item.id === id)
        if (item) {
          item.quantity = quantity
          item.price = price
        }
      }
    )
    builder.addCase(
      deleteCartAPI.fulfilled,
      (state, action: PayloadAction<number>) => {
        const id = action.payload
        state.items = state.items.filter((item) => item.id !== id)
      }
    )
  }
})
export const selectCartUser = (state: RootState) => {
  return {
    cartId: state.cart.cartId,
    items: state.cart.items
  }
}
export const selectLengthCarts = (state: RootState) => {
  return state.cart.items.length
}
export default cartSlice.reducer
