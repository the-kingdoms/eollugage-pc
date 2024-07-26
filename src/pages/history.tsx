import HistoryDateFilter from 'components/historyDateFilter'
import OrderCard from 'components/orderCard'
import { orderlist } from 'pages/process'
import { useState } from 'react'
import { Container, CardContainer, TabTitle } from 'styles/shared'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { historyCountAtom } from 'utils/atom'

export default function HistoryMain() {
  const [historyCount] = useAtom(historyCountAtom)
  const [date, setDate] = useState<string>(dayjs().format('YYYY.MM.DD'))

  return (
    <Container>
      <TabTitle>히스토리 {historyCount}</TabTitle>
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
