import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentHistory, patchPaymentHistory } from 'apis/paymentHistory'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { modalShowAtom, processCountAtom, storeIdAtom, waitingCountAtom } from 'utils/atom'

function useGetPaymentHistory(status?: string, filter?: string) {
  const [storeId] = useAtom(storeIdAtom)
  const [, setWaitingCount] = useAtom(waitingCountAtom)
  const [, setProcessCount] = useAtom(processCountAtom)

  const { data } = useQuery({
    queryKey: ['getPaymentHistory', status, filter],
    queryFn: () => getPaymentHistory(storeId, status, filter),
  })

  useEffect(() => {
    if (data) {
      if (status === undefined)
        setWaitingCount(
          data?.reduce(
            (acc, cur) => acc + cur.orderHistoryResponseDtoList.filter(order => order.status === 'PENDING').length,
            0,
          ) ?? 0,
        )

      if (status !== 'HISTORY')
        setProcessCount(
          data?.reduce(
            (acc, cur) => acc + (cur.orderHistoryResponseDtoList.some(order => order.status === 'APPROVED') ? 1 : 0),
            0,
          ) ?? 0,
        )
    }
  }, [data])
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
