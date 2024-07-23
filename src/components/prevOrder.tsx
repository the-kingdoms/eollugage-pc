import React, { SetStateAction, useState } from 'react'
import { orderType } from './orderCard'
import styled from 'styled-components'
import { Container as OrderContainer, Detail as OrderDetail } from './orderDetail'
import { returnOrderDetail, returnTotalPrice } from 'utils/cardFunc'
import { ReactComponent as UpArrowIcon } from 'assets/image/up-arrow.svg'
import { ReactComponent as DownArrowIcon } from 'assets/image/down-arrow.svg'

interface PreviousOrderProps {
  orders: orderType[]
  showDetail: boolean
  setShowDetail: React.Dispatch<SetStateAction<boolean>>
  showLabel: boolean
}

export default function PreviousOrder({ orders, showDetail, setShowDetail, showLabel }: PreviousOrderProps) {
  const toggleShowDetail = () => setShowDetail(!showDetail)
  return (
    <Container>
      {showLabel && (
        <ShowButton onClick={toggleShowDetail}>
          이전 주문 보기
          {showDetail ? <UpArrowIcon width={24} height={24} /> : <DownArrowIcon width={24} height={24} />}
        </ShowButton>
      )}
      {showDetail && (
        <OrderBox>
          {orders.map(order => (
            <PrevOrderContainer>
              <OrderContainer>
                {orders.map(order => (
                  <OrderDetail>{returnOrderDetail(order)}</OrderDetail>
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
