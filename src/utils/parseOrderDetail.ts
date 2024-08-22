import { Menu } from './type'

export const parseOrder = (jsonString: string): Menu[] => {
  try {
    const parsedData: Menu[] = JSON.parse(jsonString)
    return parsedData
  } catch (error) {
    console.error('Failed to parse order:', error)
    return []
  }
}
