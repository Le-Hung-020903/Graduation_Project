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
