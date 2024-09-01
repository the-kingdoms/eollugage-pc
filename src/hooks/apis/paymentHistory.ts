import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentHistory, patchPaymentHistory } from 'apis/paymentHistory'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { modalDetailAtom, modalShowAtom, processCountAtom, storeIdAtom, waitingCountAtom } from 'utils/atom'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from 'constants/path'
import orderSound from 'assets/sound/newOrder.mp3'
import useSound from 'use-sound'

function useGetPaymentHistory(status?: string, filter?: string) {
  const [storeId] = useAtom(storeIdAtom)
  const [waitingCount, setWaitingCount] = useAtom(waitingCountAtom)
  const [, setProcessCount] = useAtom(processCountAtom)

  const [soundPlay] = useSound(orderSound)

  const { data, isLoading } = useQuery({
    queryKey: ['getPaymentHistory', status, filter],
    queryFn: () => getPaymentHistory(storeId, status, filter),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  })

  useEffect(() => {
    if (data) {
      if (status === undefined) {
        const newWaitingCount =
          data?.reduce(
            (acc, cur) => acc + cur.orderHistoryResponseDtoList.filter(order => order.status === 'PENDING').length,
            0,
          ) ?? 0
        if (newWaitingCount > waitingCount) soundPlay()
        setWaitingCount(newWaitingCount)
      }

      if (status !== 'HISTORY')
        setProcessCount(
          data?.reduce(
            (acc, cur) => acc + (cur.orderHistoryResponseDtoList.some(order => order.status === 'APPROVED') ? 1 : 0),
            0,
          ) ?? 0,
        )
    }
  }, [data])
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
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory'] })
    },
    onError: (error, variables) => {
      const axiosError = error as AxiosError
      const { paymentHistoryId } = variables as PatchParameterType
      if (axiosError.response?.status === 400)
        setModalDetail({
          title: `${tableNumber}번 테이블 주문을 먼저 수락해주세요.`,
          description: `결제하기 전에 ${tableNumber}테이블에서 아직 승인 대기 중인 주문이 있습니다.`,
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

export { useGetPaymentHistory, usePatchPaymentHistory }
