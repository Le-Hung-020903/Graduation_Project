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

export interface IAddress {
  id?: number
  name: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
  is_default: boolean
}
