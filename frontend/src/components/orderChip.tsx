import styled from 'styled-components'

export type statusType = 'new' | 'extra' | 'multi' | 'single'
interface OrderChipProps {
  status: statusType
}

export default function OrderChip({ status }: OrderChipProps) {
  const returnChipText = () => {
    switch (status) {
      case 'new':
        return '신규 주문'
      case 'extra':
        return '추가 주문'
      case 'single':
        return '단일 주문'
      case 'multi':
        return '복수 주문'
      default:
        return 'error'
    }
  }

  return <Container status={status}>{returnChipText()}</Container>
}

const Container = styled.div<{ status: statusType }>`
  display: flex;
  align-items: center;
  border-radius: 1000px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.status === 'new' || props.status === 'single' ? '#0043CE' : '#0E6027')};
  background-color: ${props => (props.status === 'new' || props.status === 'single' ? '#D0E2FF' : '#A7F0BA')};
`
