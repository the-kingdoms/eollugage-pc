import { ModalProps } from 'components/modal'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

export const waitingCountAtom = atom<number>(0)
export const processCountAtom = atom<number>(0)
waitingCountAtom.debugLabel = 'waitingCountAtom'

export const storeIdAtom = atomWithStorage('Store ID', '')
storeIdAtom.debugLabel = 'storeIdAtom'

export const modalDetailAtom = atom<ModalProps | null>(null)
