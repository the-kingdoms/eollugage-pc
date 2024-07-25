import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

export const waitingCountAtom = atom<number>(0)
export const processCountAtom = atom<number>(0)
export const historyCountAtom = atom<number>(0)
