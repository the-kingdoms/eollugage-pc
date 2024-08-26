import styled from 'styled-components'

export default function KakaoLogin() {
  const redirectUri = `${window.location.origin}/oauth`
  const onClickLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=${redirectUri}&client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&response_type=code`
  }

  return (
    <KakaoLoginButton onClick={onClickLogin}>
      <img src={require('assets/image/kakao.png')} width={24} height={24} alt="kakao-login-button" />
      카카오 로그인
    </KakaoLoginButton>
  )
}

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
