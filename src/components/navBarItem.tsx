import styled from 'styled-components'

type VerticalNavItemProps = {
  name: string
  count?: number
  isFocused: boolean
  onClick: () => void
}

export default function NavBarItem({ name, count, isFocused, onClick }: VerticalNavItemProps) {
  return (
    <Container isFocused={isFocused} onClick={onClick}>
      <div>{name}</div>
      {count !== undefined && <CountWrapper isFocused={isFocused}>{count}</CountWrapper>}
    </Container>
  )
}

const Container = styled.div<{ isFocused: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.isFocused ? '#131313' : '#A8A8A8')};
  color: ${props => (props.isFocused ? '#E9E9E9' : '#161616')};
`
const CountWrapper = styled.div<{ isFocused: boolean }>`
  border-radius: 1000px;
  padding: 8px 16px;
  background-color: ${props => (props.isFocused ? '#0043CE' : 'rgba(22, 22, 22, 0.25)')};
  color: ${props => (props.isFocused ? '#E9E9E9' : 'rgba(22, 22, 22, 0.25)')};
`
