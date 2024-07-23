import OrderCard from 'components/orderCard'
import { Container, CardContainer, TabTitle } from 'styles/shared'

const orderlist = [
  {
    name: '크림 새우 스파게티',
    price: 14000,
    count: 1,
  },
  {
    name: '토마토 스파게티',
    price: 12000,
    options: [
      {
        name: '치즈 추가',
        price: 1500,
      },
      {
        name: '면 추가',
        price: 4000,
        count: 2,
      },
    ],
  },
  {
    name: '페퍼로니 피자',
    price: 24000,
    count: 1,
  },
]

export default function WaitMain() {
  return (
    <Container>
      <TabTitle>승인 대기 3</TabTitle>
      <CardContainer>
        <OrderCard status="new" tableNumber={2} orders={orderlist} />
        <OrderCard status="extra" tableNumber={2} orders={orderlist} />
      </CardContainer>
    </Container>
  )
}
