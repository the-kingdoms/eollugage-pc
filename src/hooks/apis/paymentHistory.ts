import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentHistory, patchPaymentHistory } from 'apis/paymentHistory'
import { useAtom } from 'jotai'
import { modalShowAtom, storeIdAtom } from 'utils/atom'

function useGetPaymentHistory() {
  const [storeId] = useAtom(storeIdAtom)

  const { data } = useQuery({
    queryKey: ['getPaymentHistory'],
    queryFn: () => getPaymentHistory(storeId),
  })
  return { data }
}

function usePatchPaymentHistory() {
  const queryClient = useQueryClient()
  const [storeId] = useAtom(storeIdAtom)
  const [, setModalShow] = useAtom(modalShowAtom)

  interface PatchParameterType {
    orderHistoryId: string
    paymentHistoryId: string
    status: string
  }

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['patchPaymentHistory'],
    mutationFn: ({ orderHistoryId, paymentHistoryId, status }: PatchParameterType) =>
      patchPaymentHistory(storeId, paymentHistoryId, orderHistoryId, status),
    onSuccess: () => {
      setModalShow(false)
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory'] })
    },
  })
  return { mutate, isSuccess }
}

export { useGetPaymentHistory, usePatchPaymentHistory }
