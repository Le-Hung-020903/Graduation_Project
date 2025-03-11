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

export interface IProduct {
  id: number
  name: string
  slug: string
  desc: string
  created_at: string // Hoặc có thể sử dụng kiểu Date nếu bạn chuyển đổi từ string sang Date
  images: Array<{
    id: number
    url: string
  }>
  category: {
    id: number
    name: string
    desc: string | null
    parent_id: number | null
    slug: string
  }
  manufacturer: {
    id: number
    name: string
    address: string
    phone: string
    email: string
  }
  ingredients: Array<{
    id: number
    name: string
    info: string
  }>
  variants: IVariant[]
}
