import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  // createCatAPI,
  getCartAPI,
  updateCartAPI
} from "../middlewares/cartMiddlewares"
import { ICart, ICartProduct } from "@/app/_interfaces/cart"
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
      (state, action: PayloadAction<ICartProduct>) => {
        const updatedProduct = action.payload // Sản phẩm vừa cập nhật
        const index = state.items.findIndex(
          (item) => item.id === updatedProduct.id
        )

        if (index !== -1) {
          // 🔥 Nếu sản phẩm đã có trong giỏ, cập nhật số lượng & giá
          state.items[index] = updatedProduct
        } else {
          // ➕ Nếu sản phẩm chưa có, thêm mới vào giỏ
          state.items.push(updatedProduct)
        }
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
export default cartSlice.reducer
