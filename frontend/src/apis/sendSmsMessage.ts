import api from './network'

async function postSendSmsMessage(storeId: string, paymentHistoryId: string): Promise<void> {
  const { data } = await api.post(
    `/api/v1/stores/${storeId}/payment-histories/${paymentHistoryId}/send-sms-messages`,
    {},
  )
  return data
}

export { postSendSmsMessage }
