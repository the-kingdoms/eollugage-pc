import { orderType, productType } from 'components/orderCard'
import { OrderDetail } from './parseOrderDetail'

export const returnTotalPrice = (order: OrderDetail) => {
  return order.price * order.count + order.options?.reduce((acc, cur) => acc + cur.price, 0)
}

export const returnOptions = (options: productType[] | undefined) => {
  if (options === undefined) return ''

  return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
}

export const returnOrderDetail = (order: OrderDetail) => {
  return `${order.name} ${order.count === undefined ? '1' : order.count}개 ${returnOptions(
    order.options,
  )} | ${returnTotalPrice(order).toLocaleString()}원`
}
