import { orderType, productType } from 'components/orderCard'
import { Menu } from './type'

export const returnTotalPrice = (order: Menu) => {
  return order.price * order.count + order.options?.reduce((acc, cur) => acc + cur.price, 0)
}

export const returnOptions = (options: productType[] | undefined) => {
  if (options === undefined) return ''

  return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
}

export const returnOrderDetail = (order: Menu) => {
  return `${order.name} ${order.count === undefined ? '1' : order.count}개 ${returnOptions(
    order.options,
  )} | ${returnTotalPrice(order).toLocaleString()}원`
}
