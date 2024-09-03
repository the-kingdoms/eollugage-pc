import HistoryDateFilter from 'components/historyDateFilter'
import OrderCard from 'components/orderCard'
import { useState } from 'react'
import { Container, CardContainer, TabTitle, Loading } from 'styles/shared'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { OrbitProgress } from 'react-loading-indicators'
import { parseOrder } from 'utils/order'

export default function HistoryMain() {
  const [date, setDate] = useState<string>(dayjs().format('YYYY.MM.DD'))
  const [filter, setFilter] = useState<string>('TODAY')

  const { data: orderList, isLoading } = useGetPaymentHistory('HISTORY', filter)

  return (
    <Container>
      <TabTitle>히스토리</TabTitle>
      <HistoryDateFilter date={date} setDate={setDate} filter={filter} setFilter={setFilter} />
      <DateText>{date}</DateText>
      {isLoading ? (
        <Loading>
          <OrbitProgress color="#6f6f6f" size="small" />
        </Loading>
      ) : (
        <CardContainer>
          {orderList
            ?.filter(orders => orders.status === 'HISTORY')
            ?.map(orders => ({
              ...orders,
              orderHistoryResponseDtoList: orders.orderHistoryResponseDtoList.sort((a, b) =>
                dayjs(b.updatedAt).diff(a.updatedAt),
              ),
            }))
            .sort((a, b) => dayjs(a.paidAt).diff(b.paidAt))
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
      )}
    </Container>
  )
}

const DateText = styled.div`
  color: #000000;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 22px;
`
