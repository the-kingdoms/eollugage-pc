import styled from 'styled-components'

export type statusType = 'new' | 'extra'
interface OrderChipProps {
  status: statusType
}

export default function OrderChip({ status }: OrderChipProps) {
  return <Container status={status}>{status === 'new' ? '신규 주문' : '추가 주문'}</Container>
}

const Container = styled.div<{ status: statusType }>`
  display: flex;
  align-items: center;
  border-radius: 1000px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.status === 'new' ? '#0043CE' : '#0E6027')};
  background-color: ${props => (props.status === 'new' ? '#D0E2FF' : '#A7F0BA')};
`
