import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import { waitingCountAtom } from 'utils/atom'
import { orderlist } from './process'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { parseOrder } from 'utils/parseOrderDetail'

export default function WaitMain() {
  const [waitingCount] = useAtom(waitingCountAtom)

  const { data: orders } = useGetPaymentHistory()

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      <CardContainer>
        {orders
          ?.filter(order => order.status === 'WAITING')
          .map(order =>
            order.orderHistoryResponseDtoList.map(eachOrder => (
              <OrderCard
                status="new"
                tableNumber={order.tableNumber}
                totalPrice={eachOrder.totalPrice}
                orders={parseOrder(eachOrder.orderDetail)}
              />
            )),
          )}
      </CardContainer>
    </Container>
  )
}
