import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import { waitingCountAtom } from 'utils/atom'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { parseOrder } from 'utils/parseOrderDetail'
import { sortOrder } from 'utils/order'

export default function WaitMain() {
  const [waitingCount] = useAtom(waitingCountAtom)

  const { data: orderList } = useGetPaymentHistory()

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      <CardContainer>
        {sortOrder(orderList, 'PENDING').map((order, i) => (
          <OrderCard
            orderHistoryId={order.orderHistoryId}
            paymentHistoryId={order.paymentHistoryId}
            status={order.state}
            time={order.createdAt}
            tableNumber={order.tableNumber}
            totalPrice={order.totalPrice}
            orders={parseOrder(order.orderDetail)}
          />
        ))}
      </CardContainer>
    </Container>
  )
}
