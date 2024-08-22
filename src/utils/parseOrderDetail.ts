interface Option {
  categoryName: string
  name: string
  price: number
}

export interface OrderDetail {
  name: string
  count: number
  price: number
  options: Option[]
}

export const parseOrder = (jsonString: string): OrderDetail[] => {
  try {
    const parsedData: OrderDetail[] = JSON.parse(jsonString)
    return parsedData
  } catch (error) {
    console.error('Failed to parse order:', error)
    return []
  }
}
