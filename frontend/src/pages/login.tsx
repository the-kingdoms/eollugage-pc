import KakaoLogin from 'components/login/kakaoLogin'
import PhoneLogin from 'components/login/phoneLogin'
import { useGetMy } from 'hooks/apis/useMy'
import { useEffect } from 'react'
import styled from 'styled-components'

export default function Login() {
  const { refetch } = useGetMy('auto')

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <FullScreen>
      <Container>
        <ImageWrapper>
          <img src={require('assets/image/logo.png')} style={{ width: '100%', height: '100%' }} alt="login-image" />
        </ImageWrapper>
        <Body>
          <PhoneLogin />
          <KakaoLogin />
        </Body>
      </Container>
    </FullScreen>
  )
}

const FullScreen = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding: 144px 0;
`
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
`
const Body = styled.div`
  width: 328px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`
