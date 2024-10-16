import { ROUTE } from 'constants/path'
import { useGetPaymentHistoryOnGoing } from 'hooks/apis/usePaymentHistory'
import { useModal } from 'hooks/useModal'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import { currentTabAtom, processOrderAtom, waitingOrderAtom } from 'utils/atom'
import { getProcessCount, getWaitingCount } from 'utils/getAlarmCount'
import NavBar from './navBar'

export default function Layout() {
  useGetPaymentHistoryOnGoing()
  const { modal } = useModal()
  const navigate = useNavigate()
  const [, setCurrentTab] = useAtom(currentTabAtom)
  const [waitingOrder] = useAtom(waitingOrderAtom)
  const [processOrder] = useAtom(processOrderAtom)
  const [navBarItem, setNavBarItem] = useState([
    {
      name: '승인 대기',
      count: getWaitingCount(waitingOrder),
      label: ROUTE.WAITING_MAIN,
      onClick: () => onClickTab(ROUTE.WAITING_MAIN),
    },
    {
      name: '진행 중',
      count: getProcessCount(processOrder),
      label: ROUTE.PROCESS_MAIN,
      onClick: () => onClickTab(ROUTE.PROCESS_MAIN),
    },
    {
      name: '히스토리',
      label: ROUTE.HISTORY_MAIN,
      onClick: () => onClickTab(ROUTE.HISTORY_MAIN),
    },
  ])

  const onClickTab = useCallback(
    (pathname: string) => {
      setCurrentTab(pathname)
      navigate(pathname)
    },
    [navigate, setCurrentTab],
  )
  useEffect(() => {
    setNavBarItem([
      {
        name: '승인 대기',
        count: getWaitingCount(waitingOrder),
        label: ROUTE.WAITING_MAIN,
        onClick: () => onClickTab(ROUTE.WAITING_MAIN),
      },
      {
        name: '진행 중',
        count: getProcessCount(processOrder),
        label: ROUTE.PROCESS_MAIN,
        onClick: () => onClickTab(ROUTE.PROCESS_MAIN),
      },
      {
        name: '히스토리',
        label: ROUTE.HISTORY_MAIN,
        onClick: () => onClickTab(ROUTE.HISTORY_MAIN),
      },
    ])
  }, [waitingOrder, processOrder, onClickTab])

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
