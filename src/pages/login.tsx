import styled from 'styled-components'
import { ReactComponent as Logo } from 'assets/image/eollugage-logo.svg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  return (
    <Container>
      <img src={require('assets/image/login.png')} style={{ flex: 1 }} alt="login-image" />
      <Right>
        <Title>
          <Logo />
          간편하게 일하는 법
        </Title>
        <KakaoLoginButton onClick={() => navigate('/waiting')}>
          <img src={require('assets/image/kakao.png')} width={24} height={24} alt="kakao-login-button" />
          카카오 로그인
        </KakaoLoginButton>
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
const KakaoLoginButton = styled.div`
  background-color: #fee500;
  width: 328px;
  border-radius: 1000px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`
