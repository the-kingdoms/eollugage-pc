import styled from 'styled-components'
import { returnOrderDetail } from 'utils/order'
import { Menu } from 'utils/type'

interface OrderDetailProps {
  orders: Menu[]
}

export default function OrderDetail({ orders }: OrderDetailProps) {
  return (
    <Container>
      {orders.map(order => (
        <Detail>{returnOrderDetail(order)}</Detail>
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
