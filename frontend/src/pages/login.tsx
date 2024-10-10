import styled from 'styled-components'
import { ReactComponent as Logo } from 'assets/image/eollugage-logo.svg'
import KakaoButton from 'components/kakaoButton'

export default function Login() {
  return (
    <Container>
      <img src={require('assets/image/login.png')} style={{ flex: 1 }} alt="login-image" />
      <Right>
        <Title>
          <Logo />
          간편하게 일하는 법
        </Title>
        <KakaoButton />
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
`
const Right = styled.div`
  flex: 1;
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 88px;
`
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7c7c7c;
  gap: 8px;
`
