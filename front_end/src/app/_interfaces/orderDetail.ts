export interface orderDetailResponse {
  success: boolean
  message: string
  data: OrderData
}

interface OrderData {
  id: number
  total_price: number
  final_price: number
  status: string // Hoặc union type cụ thể nếu biết các trạng thái có thể có, ví dụ: 'CONFIRMED' | 'PENDING' | ...
  order_code: string
  created_at: string
  orderDetails: OrderDetail[]
  user: User
  address: Address
}

interface OrderDetail {
  id: number
  quantity: number
  product: Product
  variant: Variant
}

interface Product {
  id: number
  name: string
  images: Image[]
}

interface Image {
  id: number
  url: string
}

interface Variant {
  id: number
  name: string
  price: number
}

interface User {
  name: string
}

interface Address {
  name: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
}
