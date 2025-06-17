interface IProduct {
  id: number
  name: string
}

interface IVariant {
  id: number
  name: string
}

export interface ICartProduct {
  id: number
  quantity: number
  price: number
  product: IProduct
  variant: IVariant
  variantSelected: IVariant
  images: IImages
}
export interface ICart {
  id: number
  cartProducts: ICartProduct[]
}
interface IImages {
  id: number
  url: string
}
export interface ICartUpdate {
  id: number
  quantity: number
  price: number
}
