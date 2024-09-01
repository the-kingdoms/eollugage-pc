import { statusType } from '@components/orderChip'
import { OrderHistory, PaymentHistory } from 'apis/paymentHistory'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Menu } from './type'
import { productType } from 'components/orderCard'

interface SortedOrderType extends OrderHistory {
  totalPrice: number
  tableNumber: number
  state: statusType
}

dayjs.extend(utc)

const sortOrder = (payments: PaymentHistory[] | undefined, status: string) => {
  if (payments === undefined) return []

  const selectedOrders: SortedOrderType[][] = payments.map(orders =>
    orders.orderHistoryResponseDtoList
      .filter(order => order.status === status)
      .map(order => {
        return {
          ...order,
          tableNumber: orders.tableNumber,
          totalPrice: orders.totalPrice,
          state: returnStatus(orders, order),
        }
      }),
  )
  return selectedOrders.flat().sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
}

const returnStatus = (orders: PaymentHistory, currentOrder: OrderHistory) => {
  orders.orderHistoryResponseDtoList.sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))

  if (currentOrder.orderHistoryId === orders.orderHistoryResponseDtoList[0].orderHistoryId) {
    if (currentOrder.status === 'PENDING') return 'new'
    else if (currentOrder.status === 'APPROVED') return 'single'
  } else {
    if (currentOrder.status === 'PENDING') return 'extra'
    else if (currentOrder.status === 'APPROVED') return 'multi'
  }

  return 'new'
}

const returnTime = (time: string) => {
  const diff = dayjs().utc().diff(dayjs.utc(time), 'minute')

  if (diff > 1440) return dayjs().utc().diff(dayjs.utc(time), 'day') + '일 전'
  else if (diff > 60) return dayjs().utc().diff(dayjs.utc(time), 'hour') + '시간 전'
  return diff + '분 전'
}

const parseOrder = (jsonString: string): Menu[] => {
  try {
    const parsedData: Menu[] = JSON.parse(jsonString)
    return parsedData
  } catch (error) {
    console.error('Failed to parse order:', error)
    return []
  }
}

const returnTotalPrice = (orders: Menu[]) => {
  return orders.reduce((acc, cur) => acc + returnMenuPrice(cur), 0)
}

const returnMenuPrice = (order: Menu) => {
  return order.price * order.count + order.options?.reduce((acc, cur) => acc + cur.price, 0)
}

const returnOptions = (options: productType[] | undefined) => {
  if (options?.length === 0 || options === undefined) return ''

  return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
}

const returnOrderDetail = (order: Menu) => {
  return `${order.name} ${order.count}개 ${returnOptions(order.options)} | ${returnMenuPrice(order).toLocaleString()}원`
}

export { sortOrder, returnTime, parseOrder, returnTotalPrice, returnMenuPrice, returnOptions, returnOrderDetail }
