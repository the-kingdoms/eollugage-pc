import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  padding: 60px 40px;
  overflow-y: scroll;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const TabTitle = styled.div`
  font-size: 32px;
  color: #131313;
  font-weight: 600;
  margin-bottom: 36px;
`

export { Container, CardContainer, TabTitle }
