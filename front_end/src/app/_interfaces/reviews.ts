export interface IFormDataReview {
  content: string
  rating: number
  product_id: number
  parent_id?: number | null
}

// Dùng Omit để loại bỏ product_id
export interface IReviews
  extends Omit<IFormDataReview, "product_id" | "parent_id"> {
  id: number
  created_at: string
  image_url: string | null
  user: {
    id: number
    name: string
    avatar: string
  }
  hasPurchased: boolean
  pending?: boolean
}
