import { createSlice } from "@reduxjs/toolkit"
interface ICartSlice {
  items: number
}
const initialState: ICartSlice = {
  items: 0
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    tang: (state) => {
      state.items += 1
    }
  }
})
export const { tang } = cartSlice.actions
export default cartSlice.reducer
