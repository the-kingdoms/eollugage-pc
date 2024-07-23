import HistoryDateFilter from 'components/historyDateFilter'
import OrderCard from 'components/orderCard'
import { orderlist } from 'pages/process'
import { useState } from 'react'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import styled from 'styled-components'
import dayjs from 'dayjs'

export default function HistoryMain() {
  const [date, setDate] = useState<string>(dayjs().format('YYYY.MM.DD'))

  return (
    <Container>
      <TabTitle>히스토리</TabTitle>
      <HistoryDateFilter date={date} setDate={setDate} />
      <DateText>{date}</DateText>
      <CardContainer>
        <OrderCard status="multi" tableNumber={2} orders={orderlist} prevOrders={orderlist} />
        <OrderCard status="single" tableNumber={2} orders={orderlist} />
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
