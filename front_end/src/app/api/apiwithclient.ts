import { IOrder } from "../_interfaces/order"
import { IFormDataReview } from "../_interfaces/reviews"
import { IAddress, IUser } from "../_interfaces/user"
import authorizedAxiosInstance from "../library/axios/interceptor"

// USER
export const registerUserAPI = async (data: IUser) => {
  const res = await authorizedAxiosInstance.post(`/user/create`, data)
  return res.data
}
export const changePasswordUserAPI = async (data: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  const res = await authorizedAxiosInstance.patch(`/auth/change-password`, data)
  return res.data
}

// DISCOUNT
export const getDiscountAPI = async () => {
  const res = await authorizedAxiosInstance.get(`/discount/getAll`)
  return res.data
}

// ADDRESS
export const createAddressAPI = async (data: IAddress) => {
  const res = await authorizedAxiosInstance.post(`/address/create`, data)
  return res.data
}
export const getAddressAPI = async () => {
  const res = await authorizedAxiosInstance.get(`/address`)
  return res.data
}

export const getListAddressAPI = async () => {
  const res = await authorizedAxiosInstance.get("/address/get_all")
  return res.data
}

// ORDER
export const createOrderAPI = async (data: IOrder) => {
  const res = await authorizedAxiosInstance.post(`/order/create`, data)
  return res.data
}

export const checkStatusOrderAPI = async (order_code: string) => {
  const res = await authorizedAxiosInstance.get(
    `/order/check_status/${order_code}`
  )
  return res.data
}
export const checkExistOrderAPI = async () => {
  const res = await authorizedAxiosInstance.get(`/order/check_exits_order`)
  return res.data
}
export const updateOrderAPI = async (orderId: number, data: IOrder) => {
  const res = await authorizedAxiosInstance.patch(`/order/${orderId}`, data)
  return res.data
}

// CART
export const createCartAPI = async (cart_product: {
  quantity: number
  product_id: number
  variant_id: number
  price: number
}) => {
  const res = await authorizedAxiosInstance.post(`/cart/create`, {
    cart_product
  })
  return res.data
}

// PRODUCTS
export const getProductsAPI = async (page: number, limit: number) => {
  const res = await authorizedAxiosInstance.get(
    `/product?_page=${page}&_limit=${limit}`
  )
  return res.data
}
export const searchProductsAPI = async (query: string) => {
  const res = await authorizedAxiosInstance.get(`product/search?q=${query}`)
  return res.data
}

// FAVORITE PRODUCT
export const getFavoriteProductsAPI = async () => {
  const res = await authorizedAxiosInstance.get(`/favorite-product`)
  return res.data
}
export const createFavoriteProductAPI = async (productId: number) => {
  const res = await authorizedAxiosInstance.post(`/favorite-product/create`, {
    product_id: productId
  })
  return res.data
}
export const deleteFavoriteProductAPI = async (productId: number) => {
  const res = await authorizedAxiosInstance.delete(
    `/favorite-product/${productId}`
  )
  return res.data
}

// REVIEWS
export const createReviewAPI = async (data: IFormDataReview) => {
  const res = await authorizedAxiosInstance.post(`/comment/create`, data)
  return res.data
}

export const getReviewsAPI = async (
  productId: number,
  page: number,
  limit: number
) => {
  const res = await authorizedAxiosInstance.get(
    `/comment/${productId}?_page=${page}&_limit=${limit}`
  )
  return res.data
}

// CHATBOT
export const getChatbotResponseAPI = async (question: string) => {
  const res = await authorizedAxiosInstance.post(`/google-generative-ai`, {
    question
  })
  return res.data
}
