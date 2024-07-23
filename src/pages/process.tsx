import OrderCard from 'components/orderCard'
import styled from 'styled-components'
import { Container, CardContainer, TabTitle } from 'styles/shared'

export const orderlist = [
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

export default function ProcessMain() {
  return (
    <Container>
      <TabTitle>진행 중 3</TabTitle>
      <CardContainer>
        <OrderCard status="multi" tableNumber={2} orders={orderlist} prevOrders={orderlist} />
        <OrderCard status="single" tableNumber={2} orders={orderlist} />
      </CardContainer>
    </Container>
  )
}
