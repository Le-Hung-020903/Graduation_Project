export interface IProduct {
  id: number
  name: string
  slug: string
  desc_html: string
  manufacture_date: string
  expiry_date: string
  created_at: string // Hoặc Date nếu bạn parse sang kiểu Date trong frontend
  images: IProductImage[]
  category: ICategory
  manufacturer: IManufacturer
  ingredients: IIngredient[]
  variants: IVariant[]
  isFavorite: boolean
}

interface IProductImage {
  id: number
  url: string
}

interface ICategory {
  id: number
  name: string
  desc: string | null
  slug: string
}

interface IManufacturer {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

interface IIngredient {
  id: number
  name: string
  info: string
}

export interface IVariant {
  id: number
  name: string
  price: number
  sku: string
  stock: number
  weight: number
  litre: number | null
  unit: {
    id: number
    name: string
    symbol: string
  }
}
export interface IProductListItem {
  id: number
  name: string
  slug: string
  category: {
    name: string // Tên danh mục
  }
  images: Array<{
    url: string // Ảnh sản phẩm
  }>
  variants: Array<{
    price: number // Giá sản phẩm
    unit: {
      symbol: string // Ký hiệu đơn vị (vd: kg, g, L...)
    }
  }>
  isFavorite: boolean
}
