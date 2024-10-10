import NavBarItem from './navBarItem'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { currentTabAtom } from 'utils/atom'

type VerticalNavProps = {
  items: { name: string; count?: number; label: string; onClick: () => void }[]
}

export default function NavBar({ items }: VerticalNavProps) {
  const [, setCurrentTab] = useAtom(currentTabAtom)

  const onClickItem = (path: string, onClick: () => void) => {
    setCurrentTab(path)
    onClick()
  }

  return (
    <Container>
      {items.map((item, i) => (
        <NavBarItem
          name={item.name}
          count={item.count}
          isFocused={item.label === window.location.pathname}
          onClick={() => onClickItem(item.label, item.onClick)}
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
