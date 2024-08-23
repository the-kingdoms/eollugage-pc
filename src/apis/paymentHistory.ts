import api from './network'

export interface PaymentHistory {
  paymentHistoryId: string
  storeId: string
  tableNumber: number
  status: 'WAITING' | 'PROCESS' | 'HISTORY'
  paidAt: null
  totalPrice: number
  orderHistoryResponseDtoList: OrderHistory[]
}

export interface OrderHistory {
  orderHistoryId: number
  paymentHistoryId: number
  orderDetail: string
  totalPrice: number
  status: 'APPROVED' | 'PENDING' | 'DISAPPROVED'
}

async function getPaymentHistory(storeId: string): Promise<PaymentHistory[]> {
  const { data } = await api.get(`/api/v1/stores/${storeId}/payment-histories`)
  return data
}

export { getPaymentHistory }
