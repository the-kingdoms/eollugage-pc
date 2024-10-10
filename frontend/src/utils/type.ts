export interface Menu {
  name: string
  count: number
  price: number
  options: Option[]
}

interface Option {
  categoryName: string
  name: string
  price: number
}
