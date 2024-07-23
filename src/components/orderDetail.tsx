import styled from 'styled-components'
import { orderType } from './orderCard'
import { returnOptions } from 'utils/cardFunc'

interface OrderDetailProps {
  orders: orderType[]
}

export default function OrderDetail({ orders }: OrderDetailProps) {
  return (
    <Container>
      {orders.map(order => (
        <Detail>
          {order.name} {order.count === undefined ? '1' : order.count}개 {returnOptions(order.options)} |{' '}
          {order.price.toLocaleString()}원
        </Detail>
      ))}
    </Container>
  )
}

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
`
export const Detail = styled.div`
  font-size: 20px;
  color: #6f6f6f;
  font-weight: 500;
`
