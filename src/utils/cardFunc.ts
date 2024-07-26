import { orderType, productType } from 'components/orderCard'

export const returnTotalPrice = (orders: orderType[]) =>
  orders.reduce((acc, order) => {
    if (order.options) return acc + order.price + order.options?.reduce((acc2, option) => acc2 + option.price, 0)
    return acc + order.price
  }, 0)

export const returnOptions = (options: productType[] | undefined) => {
  if (options === undefined) return ''

  return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
}

export const returnOrderDetail = (order: orderType) => {
  return `${order.name} ${order.count === undefined ? '1' : order.count}개 ${returnOptions(
    order.options,
  )} | ${order.price.toLocaleString()}원`
}
