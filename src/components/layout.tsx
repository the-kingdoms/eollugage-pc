import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import NavBar from './navBar'
import { useAtom } from 'jotai'
import { currentTabAtom, historyCountAtom, processCountAtom, waitingCountAtom } from 'utils/atom'
import { ROUTE } from 'constants/path'

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
      onClick: () => onClickTab(ROUTE.WAITING_MAIN),
    },
    {
      name: '진행 중',
      count: processCount,
      onClick: () => onClickTab(ROUTE.PROCESS_MAIN),
    },
    {
      name: '히스토리',
      count: historyCount,
      onClick: () => onClickTab(ROUTE.HISTORY_MAIN),
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
