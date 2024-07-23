import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import NavBar from './navBar'
import { useAtom } from 'jotai'
import { currentTabAtom, historyCountAtom, processCountAtom, waitingCountAtom } from 'utils/atom'

export default function Layout() {
  const navigate = useNavigate()
  const [, setCurrentTab] = useAtom(currentTabAtom)
  const [waitingCount] = useAtom(waitingCountAtom)
  const [processCount] = useAtom(processCountAtom)
  const [historyCount] = useAtom(historyCountAtom)

  const navBarItem = [
    {
      name: '승인 대기',
      count: waitingCount,
      onClick: () => onClickTab('/waiting'),
    },
    {
      name: '진행 중',
      count: processCount,
      onClick: () => onClickTab('/process'),
    },
    {
      name: '히스토리',
      count: historyCount,
      onClick: () => onClickTab('/history'),
    },
  ]

  const onClickTab = (pathname: string) => {
    setCurrentTab(pathname)
    navigate(pathname)
  }

  return (
    <Container>
      <NavWrapper>
        <NavBar items={navBarItem} />
      </NavWrapper>
      <Outlet />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const NavWrapper = styled.div`
  width: 240px;
  height: 100%;
`
