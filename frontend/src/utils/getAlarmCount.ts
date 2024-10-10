import { PaymentHistory } from 'apis/paymentHistory'

export function getWaitingCount(data: PaymentHistory[]) {
  return (
    data?.reduce(
      (acc, cur) => acc + cur.orderHistoryResponseDtoList.filter(order => order.status === 'PENDING').length,
      0,
    ) ?? 0
  )
}

export function getProcessCount(data: PaymentHistory[]) {
  return data?.reduce((acc, cur) => acc + (cur.status === 'PROCESS' ? 1 : 0), 0) ?? 0
}
