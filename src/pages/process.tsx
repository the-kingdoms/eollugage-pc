import { PaymentHistory } from 'apis/paymentHistory'
import OrderCard from 'components/orderCard'
import dayjs from 'dayjs'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle, Loading } from 'styles/shared'
import { processCountAtom } from 'utils/atom'
import { parseOrder } from 'utils/order'
import { OrbitProgress } from 'react-loading-indicators'

export default function ProcessMain() {
  const [processCount] = useAtom(processCountAtom)

  const { data: orderList, isLoading } = useGetPaymentHistory('PROCESS')

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
      {isLoading ? (
        <Loading>
          <OrbitProgress color="#6f6f6f" size="small" />
        </Loading>
      ) : (
        <CardContainer>
          {orderList
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
      )}
    </Container>
  )
}
