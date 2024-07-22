import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'
import NavBar from './navBar'

export default function Layout() {
  const navigate = useNavigate()
  const navBarItem = [
    {
      name: '승인 대기',
      count: 3,
      onClick: () => navigate('/wait'),
    },
    {
      name: '진행 중',
      count: 3,
      onClick: () => navigate('/process'),
    },
    {
      name: '히스토리',
      count: 3,
      onClick: () => navigate('/history'),
    },
  ]

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
