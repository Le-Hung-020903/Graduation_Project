export interface IComments {
  id: number
  content: string
  rating: number
  image_url: string | null
  user: {
    name: string
    avatar: string
  }
}
