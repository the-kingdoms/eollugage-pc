import { useState } from 'react'
import { orderType } from './waitingOrderCard'
import styled from 'styled-components'
import { OrderContainer, OrderDetail } from './processOrderCard'
import { returnOptions, returnTotalPrice } from 'utils/cardFunc'
import { ReactComponent as UpArrowIcon } from 'assets/image/up-arrow.svg'
import { ReactComponent as DownArrowIcon } from 'assets/image/down-arrow.svg'

interface PreviousOrderProps {
  orders: orderType[]
}

export default function PreviousOrder({ orders }: PreviousOrderProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const toggleShowDetail = () => setShowDetail(!showDetail)
  return (
    <Container>
      <ShowButton onClick={toggleShowDetail}>
        이전 주문 보기
        {showDetail ? <UpArrowIcon width={24} height={24} /> : <DownArrowIcon width={24} height={24} />}
      </ShowButton>
      {showDetail && (
        <OrderBox>
          {orders.map(order => (
            <PrevOrderContainer>
              <OrderContainer>
                {orders.map(order => (
                  <OrderDetail>
                    {order.name} {order.count === undefined ? '1' : order.count}개 {returnOptions(order.options)} |{' '}
                    {order.price.toLocaleString()}원
                  </OrderDetail>
                ))}
              </OrderContainer>
              <TotalPrice>{returnTotalPrice(orders).toLocaleString()}원</TotalPrice>
            </PrevOrderContainer>
          ))}
        </OrderBox>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`
const ShowButton = styled.div`
  color: #6f6f6f;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  gap: 8px;
  cursor: pointer;
`
const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const PrevOrderContainer = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-end;
`
const TotalPrice = styled.div`
  color: #131313;
  font-size: 28px;
  font-weight: 500;
`
