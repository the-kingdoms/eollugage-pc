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

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export { Container, CardContainer, TabTitle, Loading }
