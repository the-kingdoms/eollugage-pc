import { PaymentHistory } from 'apis/paymentHistory'
import OrderCard from 'components/orderCard'
import dayjs from 'dayjs'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import { processCountAtom } from 'utils/atom'
import { returnTotalPrice } from 'utils/cardFunc'
import { parseOrder } from 'utils/parseOrderDetail'

export default function ProcessMain() {
  const [processCount] = useAtom(processCountAtom)

  const { data: orderList } = useGetPaymentHistory('PROCESS')

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
      <TabTitle>진행 중 {processCount}</TabTitle>
      <CardContainer>
        {orderList
          ?.map(orders => ({
            ...orders,
            orderHistoryResponseDtoList: orders.orderHistoryResponseDtoList.filter(
              order => order.status === 'APPROVED',
            ),
          }))
          .filter(orders => orders.orderHistoryResponseDtoList.length > 0)
          .map(orders => (
            <OrderCard
              paymentHistoryId={orders.paymentHistoryId}
              status={orders.orderHistoryResponseDtoList.length > 1 ? 'multi' : 'single'}
              tableNumber={orders.tableNumber}
              time={returnLatestTime(orders)}
              totalPrice={returnTotalPrice(parseOrder(orders.orderHistoryResponseDtoList[0].orderDetail))}
              orders={parseOrder(orders.orderHistoryResponseDtoList[0].orderDetail)}
              prevOrders={returnPrevOrders(orders)}
            />
          ))}
      </CardContainer>
    </Container>
  )
}
