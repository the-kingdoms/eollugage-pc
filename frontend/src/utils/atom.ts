import { PaymentHistory } from 'apis/paymentHistory'
import { ModalProps } from 'components/modal'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

export const onGoingOrderAtom = atom<PaymentHistory[]>([])
onGoingOrderAtom.debugLabel = 'onGoingOrderAtom'

export const storeIdAtom = atomWithStorage('Store ID', '')
storeIdAtom.debugLabel = 'storeIdAtom'

export const modalDetailAtom = atom<ModalProps | null>(null)
