import { useState } from 'react'
import NavBarItem from './navBarItem'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { currentTabAtom } from 'utils/atom'
import { ROUTE } from 'constants/path'

type VerticalNavProps = {
  items: { name: string; count?: number; onClick: () => void }[]
}

export default function NavBar({ items }: VerticalNavProps) {
  const [, setCurrentTab] = useAtom(currentTabAtom)
  const [focusedIdx, setFocusedIdx] = useState<number>(0)

  const onClickItem = (i: number, onClick: () => void) => {
    switch (i) {
      case 0:
        setCurrentTab(ROUTE.WAITING_MAIN)
        break
      case 1:
        setCurrentTab(ROUTE.PROCESS_MAIN)
        break
      case 2:
        setCurrentTab(ROUTE.HISTORY_MAIN)
        break
      default:
        setCurrentTab('error')
    }
    setFocusedIdx(i)
    onClick()
  }

  return (
    <Container>
      {items.map((item, i) => (
        <NavBarItem
          name={item.name}
          count={item.count}
          isFocused={i === focusedIdx}
          onClick={() => onClickItem(i, item.onClick)}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
