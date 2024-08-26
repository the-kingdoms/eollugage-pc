import { useKakaoLogin } from 'hooks/apis/login'
import { useEffect, useRef } from 'react'

export default function Redirect() {
  const hasMutated = useRef<boolean>(false)
  const { mutate } = useKakaoLogin()

  const code = new URL(window.location.href).searchParams.get('code')
  const state = new URL(window.location.href).searchParams.get('state')

  useEffect(() => {
    if (!hasMutated.current && code && state) {
      mutate({
        data: {
          code,
          state,
          redirectUri: window.location.origin + window.location.pathname,
        },
      })
      hasMutated.current = true
    }
  }, [])

  return <div>로그인 중..</div>
}
