import { PaymentHistory } from 'apis/paymentHistory'
import { ModalProps } from 'components/modal'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

export const waitingOrderAtom = atom<PaymentHistory[]>([])
export const processOrderAtom = atom<PaymentHistory[]>([])
waitingOrderAtom.debugLabel = 'waitingOrderAtom'
processOrderAtom.debugLabel = 'processOrderAtom'

export const storeIdAtom = atomWithStorage('Store ID', '')
storeIdAtom.debugLabel = 'storeIdAtom'

export const modalDetailAtom = atom<ModalProps | null>(null)
