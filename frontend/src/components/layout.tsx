import orderSound from 'assets/sound/newOrder.mp3'
import { ROUTE } from 'constants/path'
import { useModal } from 'hooks/useModal'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import useSound from 'use-sound'
import { currentTabAtom, processCountAtom, waitingCountAtom } from 'utils/atom'
import NavBar from './navBar'

export default function Layout() {
  const { modal } = useModal()
  const navigate = useNavigate()
  const [, setCurrentTab] = useAtom(currentTabAtom)
  const [waitingCount] = useAtom(waitingCountAtom)
  const [processCount] = useAtom(processCountAtom)

  const navBarItem = [
    {
      name: '승인 대기',
      count: waitingCount,
      label: ROUTE.WAITING_MAIN,
      onClick: () => onClickTab(ROUTE.WAITING_MAIN),
    },
    {
      name: '진행 중',
      count: processCount,
      label: ROUTE.PROCESS_MAIN,
      onClick: () => onClickTab(ROUTE.PROCESS_MAIN),
    },
    {
      name: '히스토리',
      label: ROUTE.HISTORY_MAIN,
      onClick: () => onClickTab(ROUTE.HISTORY_MAIN),
    },
  ]

  const onClickTab = (pathname: string) => {
    setCurrentTab(pathname)
    navigate(pathname)
  }

  const [playSound] = useSound(orderSound)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (waitingCount > 0) interval = setInterval(playSound, 5000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [waitingCount, playSound])

  return (
    <Container>
      {modal}
      <NavWrapper>
        <NavBar items={navBarItem} />
      </NavWrapper>
      <Outlet />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
`
const NavWrapper = styled.div`
  width: 240px;
  height: 100%;
`
