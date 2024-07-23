import styled from 'styled-components'
import OrderChip, { statusType } from './orderChip'
import dayjs from 'dayjs'
import { orderType, productType } from './waitingOrderCard'
import { returnOptions, returnTotalPrice } from 'utils/cardFunc'
import PreviousOrder from './prevOrder'

interface OrderCardProps {
  from: 'waiting' | 'process' | 'history'
  tableNumber: number
  status: statusType
  orders: orderType[]
  prevOrders?: orderType[]
}

export default function OrderCard({ from, tableNumber, status, orders, prevOrders }: OrderCardProps) {
  return (
    <Container>
      <Top>
        <TitleContainer>
          <TableNumber>테이블 번호 {tableNumber.toString().padStart(2, '0')}</TableNumber>
          <OrderChip status={status} />
        </TitleContainer>
        <TimeText>{dayjs().locale('ko').format('YYYY년 M월 D일 HH시 mm분 ss초')}</TimeText>
      </Top>
      <OrderSummary>
        메뉴 {orders.length}개 총 {returnTotalPrice(orders).toLocaleString()}원
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
      <PreviousOrder orders={orders} />
      <ButtonContainer>
        <ApproveButton>결제 완료</ApproveButton>
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
export const OrderContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
`
export const OrderDetail = styled.div`
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
