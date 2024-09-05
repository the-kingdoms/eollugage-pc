import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentHistory, patchPaymentHistory } from 'apis/paymentHistory'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { modalDetailAtom, modalShowAtom, processCountAtom, storeIdAtom, waitingCountAtom } from 'utils/atom'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from 'constants/path'
import { getProcessCount, getWaitingCount } from 'utils/getAlarmCount'

function useGetWaitingOrder() {
  const [storeId] = useAtom(storeIdAtom)
  const [, setWaitingCount] = useAtom(waitingCountAtom)
  const [, setProcessCount] = useAtom(processCountAtom)

  const { data, isLoading } = useQuery({
    queryKey: ['getWaitingOrder'],
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    queryFn: () => getPaymentHistory(storeId, 'ALL'),
  })

  useEffect(() => {
    if (data) {
      setWaitingCount(getWaitingCount(data))
      setProcessCount(getProcessCount(data))
    }
  }, [data, setWaitingCount, setProcessCount])

  return { data, isLoading }
}

function useGetPaymentHistory(status: string, filter: string = 'ALL') {
  const [storeId] = useAtom(storeIdAtom)

  const { data, isLoading } = useQuery({
    queryKey: ['getPaymentHistory', status, filter],
    queryFn: () => getPaymentHistory(storeId, filter, status),
  })

  return { data, isLoading }
}

function usePatchPaymentHistory(tableNumber?: number) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [storeId] = useAtom(storeIdAtom)
  const [, setModalShow] = useAtom(modalShowAtom)
  const [, setModalDetail] = useAtom(modalDetailAtom)

  interface PatchParameterType {
    orderHistoryId: string
    paymentHistoryId: string
    status: string
  }

  const { mutate } = useMutation({
    mutationKey: ['patchPaymentHistory'],
    mutationFn: ({ orderHistoryId, paymentHistoryId, status }: PatchParameterType) =>
      patchPaymentHistory(storeId, paymentHistoryId, orderHistoryId, status),
    onSuccess: () => {
      setModalShow(false)
      queryClient.invalidateQueries({ queryKey: ['getWaitingOrder'] })
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory', 'PROCESS', 'ALL'] })
    },
    onError: (error, variables) => {
      const axiosError = error as AxiosError
      const { paymentHistoryId } = variables as PatchParameterType
      if (axiosError.response?.status === 400)
        setModalDetail({
          title: `${tableNumber}번 테이블 주문을 먼저 수락해주세요.`,
          description: `결제하기 전에 ${tableNumber}번 테이블에서 아직 승인 대기 중인 주문이 있습니다.`,
          grayButtonText: '닫기',
          blackButtonText: '주문 내역 확인',
          onClickGrayButton: () => setModalShow(false),
          onClickBlackButton: () => {
            setModalShow(false)
            navigate(ROUTE.WAITING_MAIN, { state: paymentHistoryId })
          },
        })
      setModalShow(true)
    },
  })
  return { mutate }
}

export { useGetWaitingOrder, useGetPaymentHistory, usePatchPaymentHistory }
