import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import { waitingCountAtom } from 'utils/atom'
import { orderlist } from './process'

export default function WaitMain() {
  const [waitingCount] = useAtom(waitingCountAtom)

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      <CardContainer>
        <OrderCard status="new" tableNumber={2} orders={orderlist} />
        <OrderCard status="extra" tableNumber={2} orders={orderlist} />
      </CardContainer>
    </Container>
  )
}
