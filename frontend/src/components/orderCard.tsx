import { ROUTE } from 'constants/path'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import styled from 'styled-components'
import { Menu } from 'utils/type'
import OrderChip, { statusType } from './orderChip'
import OrderDetail from './orderDetail'
import PreviousOrder from './prevOrder'

import {
  usePatchPaymentHistoryApproved,
  usePatchPaymentHistoryDenied,
  usePatchPaymentHistoryDone,
} from 'hooks/apis/usePaymentHistory'
import { useModal } from 'hooks/useModal'
import { returnTime } from 'utils/order'

export type productType = {
  name: string
  price: number
  count?: number
}

export type orderType = productType & {
  options?: productType[]
}

interface OrderCardProps {
  paymentHistoryId?: string
  orderHistoryId?: string
  tableNumber: number
  time: string
  totalPrice: number
  status: statusType
  orders: Menu[]
  prevOrders?: Menu[][]
}

dayjs.extend(utc)
dayjs.extend(timezone)

export default function OrderCard({
  paymentHistoryId,
  orderHistoryId,
  tableNumber,
  time,
  totalPrice,
  status,
  orders,
  prevOrders,
}: OrderCardProps) {
  const pathname = window.location.pathname

  const { openModal, closeModal } = useModal()

  const [showDetail, setShowDetail] = useState<boolean>(false)
  const toggleShowDetail = () => setShowDetail(!showDetail)

  const { mutate: approvedMutate } = usePatchPaymentHistoryApproved()
  const { mutate: deniedMutate } = usePatchPaymentHistoryDenied()
  const { mutate: doneMutate } = usePatchPaymentHistoryDone(tableNumber)

  const patchPaymentHistory = (status: string) => {
    if (!paymentHistoryId || !orderHistoryId) return
    switch (status) {
      case 'APPROVED':
        return approvedMutate({ paymentHistoryId, orderHistoryId })
      case 'DENIED':
        return deniedMutate({ paymentHistoryId, orderHistoryId })
      case 'DONE':
        return doneMutate({ paymentHistoryId, orderHistoryId })
    }
  }

  const denyOrder = () => {
    openModal({
      title: '주문 거절을 하시겠어요?',
      description: '주문 거절을 하시고 거절 사유를 손님께 말씀해주세요.',
      grayButtonText: '안 할래요',
      blackButtonText: '할래요',
      onClickGrayButton: closeModal,
      onClickBlackButton: () => patchPaymentHistory('DENIED'),
    })
  }

  const getOrderCount = () => {
    const currentOrderCount = orders.reduce((acc, cur) => acc + cur.count, 0)
    // prettier-ignore
    const prevOrdersCount = prevOrders?.reduce((acc, cur) => acc + cur.reduce((acc2, cur2) => acc2 + cur2.count, 0), 0) ?? 0

    return currentOrderCount + prevOrdersCount
  }

  return (
    <Container>
      <Top>
        <TitleContainer>
          <TableNumber>테이블 번호 {tableNumber.toString().padStart(2, '0')}</TableNumber>
          <OrderChip status={status} />
        </TitleContainer>
        <TimeText>
          {pathname === ROUTE.WAITING_MAIN
            ? returnTime(time)
            : time && dayjs.utc(time).tz('Asia/Seoul').format('YYYY년 M월 D일 HH시 mm분 ss초')}
          {pathname === ROUTE.HISTORY_MAIN && ' 결제 완료'}
        </TimeText>
      </Top>
      <OrderSummary>
        메뉴 {getOrderCount()}개 총 {totalPrice.toLocaleString()}원
      </OrderSummary>
      <OrderDetail orders={orders} />
      {!(pathname === ROUTE.HISTORY_MAIN && status === 'single') && <Divider />}
      {prevOrders !== undefined && (
        <PreviousOrder
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          orders={prevOrders}
          showLabel={pathname === ROUTE.PROCESS_MAIN && status === 'multi'}
        />
      )}
      <ButtonContainer>
        {pathname === ROUTE.WAITING_MAIN && (
          <>
            <WhiteButton onClick={denyOrder}>주문 거절</WhiteButton>
            <BlackButton onClick={() => patchPaymentHistory('APPROVED')}>주문 승인</BlackButton>
          </>
        )}
        {pathname === ROUTE.PROCESS_MAIN && (
          <BlackButton onClick={() => patchPaymentHistory('DONE')}>결제 완료</BlackButton>
        )}
        {pathname === ROUTE.HISTORY_MAIN && status === 'multi' && (
          <BlackButton onClick={toggleShowDetail}>{showDetail ? '최초 주문만 보기' : '이전 주문 보기'}</BlackButton>
        )}
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
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
const Divider = styled.hr`
  margin: 32px 0;
`
const WhiteButton = styled.div`
  border-radius: 8px;
  border: 1px solid #a8a8a8;
  padding: 20px 32px;
  color: #6f6f6f;
  font-size: 20px;
  font-weight: 600;
`
const BlackButton = styled.div`
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
