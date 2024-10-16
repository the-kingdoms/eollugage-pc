import { PaymentHistory } from 'apis/paymentHistory'
import OrderCard from 'components/orderCard'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { CardContainer, Container, TabTitle } from 'styles/shared'
import { processOrderAtom } from 'utils/atom'
import { getProcessCount } from 'utils/getAlarmCount'
import { parseOrder } from 'utils/order'

export default function ProcessMain() {
  const [processOrder] = useAtom(processOrderAtom)

  const returnPrevOrders = (orders: PaymentHistory) => {
    if (orders.orderHistoryResponseDtoList.length <= 1) return undefined
    return orders.orderHistoryResponseDtoList.slice(1).map(order => parseOrder(order.orderDetail))
  }

  const returnLatestTime = (orders: PaymentHistory) => {
    const times = orders.orderHistoryResponseDtoList
      .map(order => order.updatedAt)
      .sort((a, b) => dayjs(b).diff(dayjs(a)))

    return times[0] ?? ''
  }

  return (
    <Container>
      <TabTitle>진행 중 {getProcessCount(processOrder)}</TabTitle>
      <CardContainer>
        {processOrder
          ?.map(orders => ({
            ...orders,
            orderHistoryResponseDtoList: orders.orderHistoryResponseDtoList
              .filter(order => order.status === 'APPROVED')
              .sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt)),
          }))
          .filter(orders => orders.orderHistoryResponseDtoList.length > 0)
          .sort((a, b) =>
            dayjs(b.orderHistoryResponseDtoList[0].updatedAt).diff(a.orderHistoryResponseDtoList[0].updatedAt),
          )
          .map(orders => (
            <OrderCard
              paymentHistoryId={orders.paymentHistoryId}
              orderHistoryId={orders.orderHistoryResponseDtoList[0].orderHistoryId}
              status={orders.orderHistoryResponseDtoList.length > 1 ? 'multi' : 'single'}
              tableNumber={orders.tableNumber}
              time={returnLatestTime(orders)}
              totalPrice={orders.totalPrice}
              orders={parseOrder(orders.orderHistoryResponseDtoList[0].orderDetail)}
              prevOrders={returnPrevOrders(orders)}
            />
          ))}
      </CardContainer>
    </Container>
  )
}
