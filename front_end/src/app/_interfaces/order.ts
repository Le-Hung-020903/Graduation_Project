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
