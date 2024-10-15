import Modal, { ModalProps } from 'components/modal'
import { useAtom } from 'jotai'
import { modalDetailAtom } from 'utils/atom'

function useModal() {
  const [modal, setModal] = useAtom(modalDetailAtom)
  const openModal = (modalProps: ModalProps) => {
    setModal(modalProps)
  }
  const closeModal = () => {
    setModal(null)
  }
  const modalComponent = modal ? <Modal {...modal} /> : null
  return { openModal, closeModal, modal: modalComponent }
}

export { useModal }
