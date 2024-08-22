import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

export const waitingCountAtom = atom<number>(0)
export const processCountAtom = atom<number>(0)
export const historyCountAtom = atom<number>(0)

export const storeIdAtom = atom<string>('f981c384-561d-11ef-8428-0269b9eb59fb')
