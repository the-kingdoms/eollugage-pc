import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import { waitingCountAtom } from 'utils/atom'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { parseOrder } from 'utils/parseOrderDetail'
import { PaymentHistory } from 'apis/paymentHistory'

export default function WaitMain() {
  const [waitingCount] = useAtom(waitingCountAtom)

  const { data: orderList } = useGetPaymentHistory()

  const returnStatus = (orders: PaymentHistory, i: number) => {
    const ordersLength = orders.orderHistoryResponseDtoList.length

    if (ordersLength > 1 && i !== ordersLength - 1) return 'extra'
    return 'new'
  }

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      <CardContainer>
        {orderList?.map(orders =>
          orders.orderHistoryResponseDtoList
            .filter(order => order.status === 'PENDING')
            .map((eachOrder, i) => (
              <OrderCard
                status={returnStatus(orders, i)}
                tableNumber={orders.tableNumber}
                totalPrice={eachOrder.totalPrice}
                orders={parseOrder(eachOrder.orderDetail)}
              />
            )),
        )}
      </CardContainer>
    </Container>
  )
}
