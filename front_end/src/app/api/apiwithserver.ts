import { ICategory } from "../_interfaces/category"
import { IManufacturer } from "../_interfaces/manufacturer"
import { IProduct } from "../_interfaces/product"
import { API_ROOT } from "../utils/constants"

// PRODUCT
export const getProductDetail = async (
  slug: string
): Promise<{
  success: boolean
  message: string
  data: IProduct
  breadCrumb: { name: string; slug: string; depth: number }[]
  error?: string
  statusCode?: number
}> => {
  const res = await fetch(`${API_ROOT}/product/${slug}`)
  return res.json()
}

export const getProductList = async (
  page: number,
  limit: number,
  slug?: string
) => {
  const res = await fetch(
    `${API_ROOT}/product?_page=${page}&_limit=${limit}&q=${slug ? slug : ""}`
  )
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
