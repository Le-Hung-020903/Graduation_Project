import { ICategory } from "../_interfaces/category"
import { IManufacturer } from "../_interfaces/manufacturer"
import { IOrderResponse } from "../_interfaces/order"
import { orderDetailResponse } from "../_interfaces/orderDetail"
import { IProduct } from "../_interfaces/product"
import { API_ROOT } from "../utils/constants"

// PRODUCT
export const getProductDetail = async (
  slug: string,
  accessToken?: string
): Promise<{
  success: boolean
  message: string
  data: IProduct
  breadCrumb: { name: string; slug: string; depth: number }[]
  error?: string
  statusCode?: number
}> => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }
  const res = await fetch(`${API_ROOT}/product/${slug}`, {
    method: "GET", // Cần khai báo method nếu không dùng mặc định
    credentials: "include", // Đảm bảo cookie được gửi kèm theo request,
    headers
  })
  return res.json()
}

export const getProductList = async (
  page: number,
  limit: number,
  slug?: string,
  accessToken?: string
) => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }
  const res = await fetch(
    `${API_ROOT}/product?_page=${page}&_limit=${limit}&q=${slug ? slug : ""}`,
    {
      method: "GET",
      credentials: "include",
      headers
    }
  )
  return res.json()
}

export const searchProductsAPI = async (
  query: string,
  accessToken?: string
) => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }
  const res = await fetch(`${API_ROOT}/product/search/detail?q=${query}`, {
    method: "GET",
    credentials: "include",
    headers
  })
  return res.json()
}

// CATEGORIES
export const getCategoriesAPI = async (): Promise<{
  success: boolean
  message: string
  data: ICategory[]
}> => {
  const response = await fetch(`${API_ROOT}/category/getAll`)
  return response.json()
}

export const getCategoriesParentsAPI = async (): Promise<{
  success: boolean
  message: string
  data: ICategory[]
}> => {
  const response = await fetch(`${API_ROOT}/category/get_parent_category`)
  return response.json()
}

// MANUFACTURER
export const getManufacturersAPI = async (): Promise<{
  success: boolean
  message: string
  data: IManufacturer[]
}> => {
  const response = await fetch(`${API_ROOT}/manufacturer/getAll`)
  return response.json()
}

//ORDER
export const getOrderUserAPI = async (
  status: "All" | "PENDING" | "CONFIRMED",
  accessToken: string
): Promise<{
  success: boolean
  message: string
  data: IOrderResponse[]
}> => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }
  const res = await fetch(
    status === "All"
      ? `${API_ROOT}/order`
      : `${API_ROOT}/order?status=${status}`,
    {
      method: "GET",
      credentials: "include",
      headers
    }
  )
  return res.json()
}

export const getOrderDetailAPI = async (
  id: number,
  accessToken: string
): Promise<orderDetailResponse> => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }
  const res = await fetch(`${API_ROOT}/order/${id}`, {
    method: "GET",
    credentials: "include",
    headers
  })
  return res.json()
}
