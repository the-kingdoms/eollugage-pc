import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import NavBar from './navBar'
import { useAtom } from 'jotai'
import { currentTabAtom, modalDetailAtom, modalShowAtom, processCountAtom, waitingCountAtom } from 'utils/atom'
import { ROUTE } from 'constants/path'
import { useGetPaymentHistory } from 'hooks/apis/paymentHistory'
import { useEffect } from 'react'
import Modal from './modal'

export default function Layout() {
  const navigate = useNavigate()
  const [, setCurrentTab] = useAtom(currentTabAtom)
  const [waitingCount] = useAtom(waitingCountAtom)
  const [processCount] = useAtom(processCountAtom)
  const [modalDetail] = useAtom(modalDetailAtom)
  const [modalShow] = useAtom(modalShowAtom)

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

  return (
    <Container>
      {modalShow && (
        <Modal
          title={modalDetail?.title}
          description={modalDetail?.description}
          grayButtonText={modalDetail?.grayButtonText}
          blackButtonText={modalDetail?.blackButtonText}
          onClickGrayButton={modalDetail?.onClickGrayButton}
          onClickBlackButton={modalDetail?.onClickBlackButton}
        />
      )}
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
