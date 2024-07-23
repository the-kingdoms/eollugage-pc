import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentTabAtom = atomWithStorage('Current Tab', '/waiting')
currentTabAtom.debugLabel = 'currentTabAtom'

