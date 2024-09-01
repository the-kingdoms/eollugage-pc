import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle, Loading } from 'styles/shared'
import { waitingCountAtom } from 'utils/atom'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { parseOrder } from 'utils/parseOrderDetail'
import { sortOrder } from 'utils/order'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { OrbitProgress } from 'react-loading-indicators'

export default function WaitMain() {
  const location = useLocation()
  const [waitingCount] = useAtom(waitingCountAtom)

  const { data: orderList, isLoading } = useGetPaymentHistory()

  useEffect(() => {
    if (location.state !== null) {
      document.getElementById(location.state)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      {isLoading ? (
        <Loading>
          <OrbitProgress color="#6f6f6f" size="small" />
        </Loading>
      ) : (
        <CardContainer>
          {sortOrder(orderList, 'PENDING').map((order, i) => (
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
      )}
    </Container>
  )
}
