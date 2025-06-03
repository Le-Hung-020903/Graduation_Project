export enum PaymentMethod {
  COD = "COD",
  QR_PAYMENT = "QR_PAYMENT"
}
export interface IOrder {
  discount_id: number | null
  address_id: number
  note: string
  payment_method: PaymentMethod
  final_price: number
  order_details: {
    quantity: number
    variant_id: number
    product_id: number
    price: number
  }[]
}

export interface IOrderResponse {
  id: number
  status: string
  final_price: number
  created_at: string // hoặc có thể dùng Date nếu bạn parse thành Date object
  product: Product
  more: string
}

interface Product {
  name: string
  images: {
    url: string
  }
  variant: {
    name: string
  }
}
export interface IWebsocketOrderData {
  order_code: string
  payment_status: "UNPAID" | "PAID"
  payment_method: "COD" | "QR_PAYMENT"
  admin_redirect_url?: string
  user_redirect_url?: string
  user_id?: number
}
export interface IWebsocketOrder {
  id: number
  title: string
  message: string
  is_read: boolean
  user_redirec_url: string | null
  admin_redirec_url: string | null
  receiver_role: "USER" | "ADMIN"
  user: {
    id: number
  }
  created_at: string
  updated_at: string
}
