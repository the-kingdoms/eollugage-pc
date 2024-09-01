import HistoryDateFilter from 'components/historyDateFilter'
import OrderCard from 'components/orderCard'
import { useState } from 'react'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { parseOrder } from 'utils/parseOrderDetail'

export default function HistoryMain() {
  const [date, setDate] = useState<string>(dayjs().format('YYYY.MM.DD'))

  const { data: orderList } = useGetPaymentHistory()

  return (
    <Container>
      <TabTitle>히스토리</TabTitle>
      <HistoryDateFilter date={date} setDate={setDate} />
      <DateText>{date}</DateText>
      <CardContainer>
        {orderList
          ?.filter(orders => orders.status === 'HISTORY')
          .map(orders => (
            <OrderCard
              status={orders.orderHistoryResponseDtoList.length > 1 ? 'multi' : 'single'}
              time={orders.paidAt ?? ''}
              tableNumber={orders.tableNumber}
              totalPrice={orders.totalPrice}
              orders={parseOrder(orders.orderHistoryResponseDtoList[0].orderDetail)}
              prevOrders={orders.orderHistoryResponseDtoList.slice(1).map(order => parseOrder(order.orderDetail))}
            />
          ))}
      </CardContainer>
    </Container>
  )
}

const DateText = styled.div`
  color: #000000;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 22px;
`
