export interface IUser {
  id: number
  name: string
  email: string
  phone: string
  address: string | null
  avatar: string | null
  roles?:
    | string[]
    | {
        id: number
        name: string
        permissions: {
          id: number
          value: string
        }[]
      }[]
  exp?: number
  accessToken?: string
}
