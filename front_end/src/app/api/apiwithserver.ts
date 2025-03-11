import { ICategory } from "../_interfaces/category"
import { IProduct } from "../_interfaces/product"
import { API_ROOT } from "../utils/constants"

// PRODUCT
export const getProductDetail = async (
  slug: string
): Promise<{
  success: boolean
  message: string
  data: IProduct
  error?: string
  statusCode?: number
}> => {
  const res = await fetch(`${API_ROOT}/product/${slug}`)
  return res.json()
}

// CATEGORIES
export const getCategoriesAPI = async (): Promise<{
  success: boolean
  message: string
  data: ICategory[]
}> => {
  const response = await fetch(`${API_ROOT}/category`)
  return response.json()
}
