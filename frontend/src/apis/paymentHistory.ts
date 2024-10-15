import api from './network'

export interface PaymentHistory {
  paymentHistoryId: string
  storeId: string
  tableNumber: number
  status: PaymentHistoryStatus
  paidAt: null
  totalPrice: number
  orderHistoryResponseDtoList: OrderHistory[]
}

export interface OrderHistory {
  orderHistoryId: string
  paymentHistoryId: string
  orderDetail: string
  totalPrice: number
  createdAt: string
  updatedAt: string | null
  status: OrderHistoryStatus
}

type PaymentHistoryStatus = 'WAITING' | 'PROCESS' | 'HISTORY'
type OrderHistoryStatus = 'APPROVED' | 'PENDING' | 'DISAPPROVED' | 'HISTORY'
type PatchPaymentHistoryStatus = 'APPROVED' | 'DONE' | 'DENIED'

async function getPaymentHistory(storeId: string, filter: string, status?: string): Promise<PaymentHistory[]> {
  const statusQuery = status ? `&status=${status}` : ''
  const { data } = await api.get(`/api/v1/stores/${storeId}/payment-histories?filter=${filter}${statusQuery}`)
  return data
}

async function patchPaymentHistory(
  storeId: string,
  paymentHistoryId: string,
  orderHistoryId: string,
  status: PatchPaymentHistoryStatus,
): Promise<PaymentHistory[]> {
  const body = { status }
  const { data } = await api.patch(
    `/api/v1/stores/${storeId}/payment-histories/${paymentHistoryId}/order-histories/${orderHistoryId}`,
    body,
  )
  return data
}

export { getPaymentHistory, patchPaymentHistory }
