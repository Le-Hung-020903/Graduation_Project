export interface ICategory {
  id: number
  name: string
  desc?: string
  slug: string
  parent_id?: string
  children: ICategory[]
}
