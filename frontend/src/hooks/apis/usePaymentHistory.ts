import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentHistory, patchPaymentHistory } from 'apis/paymentHistory'
import { AxiosError } from 'axios'
import { ROUTE } from 'constants/path'
import { useModal } from 'hooks/useModal'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { processCountAtom, storeIdAtom, waitingCountAtom } from 'utils/atom'
import { getProcessCount, getWaitingCount } from 'utils/getAlarmCount'

interface PatchParameterType {
  orderHistoryId: string
  paymentHistoryId: string
}

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

function usePatchPaymentHistoryApproved() {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const [storeId] = useAtom(storeIdAtom)

  const { mutate } = useMutation({
    mutationKey: ['patchPaymentHistory', 'APPROVED'],
    mutationFn: ({ orderHistoryId, paymentHistoryId }: PatchParameterType) =>
      patchPaymentHistory(storeId, paymentHistoryId, orderHistoryId, 'APPROVED'),
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['getWaitingOrder'] })
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory', 'PROCESS', 'ALL'] })
    },
  })
  return { mutate }
}

function usePatchPaymentHistoryDenied() {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const [storeId] = useAtom(storeIdAtom)

  const { mutate } = useMutation({
    mutationKey: ['patchPaymentHistory', 'DENIED'],
    mutationFn: ({ orderHistoryId, paymentHistoryId }: PatchParameterType) =>
      patchPaymentHistory(storeId, paymentHistoryId, orderHistoryId, 'DENIED'),
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['getWaitingOrder'] })
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory', 'PROCESS', 'ALL'] })
    },
  })
  return { mutate }
}

function usePatchPaymentHistoryDone(tableNumber?: number) {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModal()
  const queryClient = useQueryClient()

  const [storeId] = useAtom(storeIdAtom)

  const { mutate } = useMutation({
    mutationKey: ['patchPaymentHistory', 'DONE'],
    mutationFn: ({ orderHistoryId, paymentHistoryId }: PatchParameterType) =>
      patchPaymentHistory(storeId, paymentHistoryId, orderHistoryId, 'DONE'),
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['getWaitingOrder'] })
      queryClient.invalidateQueries({ queryKey: ['getPaymentHistory', 'PROCESS', 'ALL'] })
    },
    onError: (error, variables) => {
      const axiosError = error as AxiosError
      const { paymentHistoryId } = variables as PatchParameterType
      if (axiosError.response?.status === 400)
        openModal({
          title: `${tableNumber}번 테이블 주문을 먼저 수락해주세요.`,
          description: `결제하기 전에 ${tableNumber}번 테이블에서 아직 승인 대기 중인 주문이 있습니다.`,
          grayButtonText: '닫기',
          blackButtonText: '주문 내역 확인',
          onClickGrayButton: closeModal,
          onClickBlackButton: () => {
            closeModal()
            navigate(ROUTE.WAITING_MAIN, { state: paymentHistoryId })
          },
        })
    },
  })
  return { mutate }
}

export {
  useGetPaymentHistory,
  useGetWaitingOrder,
  usePatchPaymentHistoryApproved,
  usePatchPaymentHistoryDenied,
  usePatchPaymentHistoryDone,
}
