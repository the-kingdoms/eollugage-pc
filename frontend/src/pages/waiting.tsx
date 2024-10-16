import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardContainer, Container, TabTitle } from 'styles/shared'
import { onGoingOrderAtom } from 'utils/atom'
import { getWaitingCount } from 'utils/getAlarmCount'
import { parseOrder, sortOrder } from 'utils/order'

export default function WaitMain() {
  const location = useLocation()
  const [onGoingOrder] = useAtom(onGoingOrderAtom)

  useEffect(() => {
    if (location.state !== null) {
      document.getElementById(location.state)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  return (
    <Container>
      <TabTitle>승인 대기 {getWaitingCount(onGoingOrder)}</TabTitle>
      <CardContainer>
        {sortOrder(onGoingOrder, 'PENDING').map((order, i) => (
          <div id={order.paymentHistoryId} key={order.orderHistoryId}>
            <OrderCard
              orderHistoryId={order.orderHistoryId}
              paymentHistoryId={order.paymentHistoryId}
              status={order.state}
              time={order.createdAt}
              tableNumber={order.tableNumber}
              totalPrice={order.totalPrice}
              orders={parseOrder(order.orderDetail)}
            />
          </div>
        ))}
      </CardContainer>
    </Container>
  )
}
