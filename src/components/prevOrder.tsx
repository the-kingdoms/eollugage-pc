import React, { SetStateAction } from 'react'
import styled from 'styled-components'
import { Container as OrderContainer, Detail as OrderDetail } from './orderDetail'
import { returnOrderDetail, returnTotalPrice } from 'utils/cardFunc'
import { ReactComponent as DownArrowIcon } from 'assets/image/down-arrow.svg'
import { Menu } from 'utils/type'
import { Variants, motion } from 'framer-motion'

const iconVariants: Variants = {
  notShow: {
    transform: 'rotate(0deg)',
    transition: { duration: 0.1 },
  },
  show: {
    transform: 'rotate(180deg)',
    transition: { duration: 0.1 },
  },
}

const orderBoxVariants: Variants = {
  notShow: { opacity: 0 },
  show: { opacity: 1 },
}

interface PreviousOrderProps {
  orders: Menu[][]
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
          <motion.svg
            width={24}
            height={24}
            variants={iconVariants}
            initial="notShow"
            animate={showDetail ? 'show' : 'notShow'}
          >
            <DownArrowIcon width={24} height={24} />
          </motion.svg>
        </ShowButton>
      )}
      {showDetail && (
        <OrderBox
          variants={orderBoxVariants}
          initial="notShow"
          exit="notShow"
          animate={showDetail ? 'show' : 'notShow'}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          {orders.map(order => (
            <PrevOrderContainer>
              <OrderContainer>
                {order.map(eachOrder => (
                  <OrderDetail>{returnOrderDetail(eachOrder)}</OrderDetail>
                ))}
              </OrderContainer>
              <TotalPrice>{returnTotalPrice(order).toLocaleString()}원</TotalPrice>
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
const OrderBox = styled(motion.div)`
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
