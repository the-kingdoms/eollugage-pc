import styled from 'styled-components'
import OrderChip, { statusType } from './orderChip'

type productType = {
  name: string
  price: number
  count?: number
}

type orderType = productType & {
  options?: productType[]
}

interface OrderCardProps {
  tableNumber: number
  status: statusType
  orders: orderType[]
}

export default function OrderCard({ tableNumber, status, orders }: OrderCardProps) {
  const returnTotalPrice = () =>
    orders.reduce((acc, order) => {
      if (order.options) return acc + order.price + order.options?.reduce((acc2, option) => acc2 + option.price, 0)
      return acc + order.price
    }, 0)

  const returnOptions = (options: productType[] | undefined) => {
    if (options === undefined) return

    return ' | '.concat(options?.map(option => `${option.name} (+${option.price}원)`).join(', '))
  }

  return (
    <Container>
      <Top>
        <TitleContainer>
          <TableNumber>테이블 번호 {tableNumber.toString().padStart(2, '0')}</TableNumber>
          <OrderChip status={status} />
        </TitleContainer>
        <TimeText>0분 전</TimeText>
      </Top>
      <OrderSummary>
        메뉴 {orders.length}개 총 {returnTotalPrice().toLocaleString()}원
      </OrderSummary>
      <OrderContainer>
        {orders.map(order => (
          <OrderDetail>
            {order.name} {order.count === undefined ? '1' : order.count}개 {returnOptions(order.options)} |{' '}
            {order.price.toLocaleString()}원
          </OrderDetail>
        ))}
      </OrderContainer>
      <Divider />
      <ButtonContainer>
        <DenyButton>주문 거절</DenyButton>
        <ApproveButton>주문 거절</ApproveButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  padding: 40px;
  border-radius: 16px;
  border: 2px solid #c6c6c6;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`
const TableNumber = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #161616;
`
const TitleContainer = styled.div`
  display: flex;
  gap: 32px;
`
const TimeText = styled.div`
  color: #6f6f6f;
  font-size: 28px;
  font-weight: 600;
`
const OrderSummary = styled.div`
  color: #131313;
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 24px;
`
const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const OrderDetail = styled.div`
  font-size: 20px;
  color: #6f6f6f;
  font-weight: 500;
`
const Divider = styled.hr`
  margin: 32px 0;
`
const DenyButton = styled.div`
  border-radius: 8px;
  border: 1px solid #a8a8a8;
  padding: 20px 32px;
  color: #6f6f6f;
  font-size: 20px;
  font-weight: 600;
`
const ApproveButton = styled.div`
  border-radius: 8px;
  border: 1px solid #131313;
  background-color: #131313;
  padding: 20px 32px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  width: 100%;
  cursor: pointer;
`
