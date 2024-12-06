import { useMutation } from '@tanstack/react-query'
import { postSendSmsMessage } from 'apis/sendSmsMessage'
import { useModal } from 'hooks/useModal'
import { useAtom } from 'jotai'
import { storeIdAtom } from 'utils/atom'

interface PostSendSmsMessageType {
  paymentHistoryId: string
}

function useSendSmsMessage() {
  const { openModal, closeModal } = useModal()

  const [storeId] = useAtom(storeIdAtom)

  const { mutate } = useMutation({
    mutationKey: ['postSendSmsMessage'],
    mutationFn: ({ paymentHistoryId }: PostSendSmsMessageType) => postSendSmsMessage(storeId, paymentHistoryId),
    onSuccess: () => {
      openModal({
        title: '조리 완료 문자가 전송되었습니다.',
        blackButtonText: '확인',
        onClickBlackButton: closeModal,
      })
    },
    onError: () => {
      openModal({
        title: '조리 완료 문자가 전송이 실패했습니다다.',
        blackButtonText: '확인',
        onClickBlackButton: closeModal,
      })
    },
  })
  return { mutate }
}

export { useSendSmsMessage }
