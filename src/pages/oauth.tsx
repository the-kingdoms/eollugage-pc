import { useKakaoLogin } from 'hooks/apis/login'
import { useEffect } from 'react'

export default function Redirect() {
  const { mutate } = useKakaoLogin()
  const code = new URL(window.location.href).searchParams.get('code')
  const state = new URL(window.location.href).searchParams.get('state')

  useEffect(() => {
    if (code)
      mutate({
        data: {
          code,
          state: state ?? '',
          redirectUri: window.location.origin + window.location.pathname,
        },
      })
  }, [code, state])

  return <div>로그인 중</div>
}
