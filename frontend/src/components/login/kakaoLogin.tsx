import styled from 'styled-components'
import { createRandomString } from 'utils/createRandomId'

export default function KakaoLogin() {
  const redirectUri = `${window.location.origin}/oauth`
  const onClickLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=${redirectUri}&client_id=${
      process.env.REACT_APP_KAKAO_REST_KEY
    }&response_type=code&state=${createRandomString(8)}`
  }

  return (
    <KakaoLoginButton onClick={onClickLogin}>
      <img src={require('assets/image/kakao.png')} width={24} height={24} alt="kakao-login-button" />
      카카오 로그인
    </KakaoLoginButton>
  )
}

const KakaoLoginButton = styled.button`
  background-color: #fee500;
  width: 328px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 64px;
  gap: 8px;
  border: none;
`
