import { productType } from 'components/orderCard'
import { Menu } from './type'

export const returnTotalPrice = (orders: Menu[]) => {
  return orders.reduce((acc, cur) => acc + returnMenuPrice(cur), 0)
}

export const returnMenuPrice = (order: Menu) => {
  return order.price * order.count + order.options?.reduce((acc, cur) => acc + cur.price, 0)
}

export const returnOptions = (options: productType[] | undefined) => {
  if (options?.length === 0 || options === undefined) return ''

  return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
}

export const returnOrderDetail = (order: Menu) => {
  return `${order.name} ${order.count}개 ${returnOptions(order.options)} | ${returnMenuPrice(order).toLocaleString()}원`
}
