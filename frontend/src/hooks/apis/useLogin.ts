import { ROUTE } from 'constants/path'
import { useMutation } from '@tanstack/react-query'
import { PostKakaoLoginBody, postKakaoLogin } from 'apis/login'
import { setTokenFromLocalStorage } from 'apis/network'
import { useNavigate } from 'react-router-dom'
import { useGetMy } from './useMy'

function useKakaoLogin() {
  const navigate = useNavigate()
  const { refetch } = useGetMy()

  const { mutate } = useMutation({
    mutationKey: ['postKakaoLogin'],
    mutationFn: ({ data }: { data: PostKakaoLoginBody }) => postKakaoLogin(data),
    retry: false,
    onSuccess: res => {
      setTokenFromLocalStorage(res.token)
      refetch()
    },
    onError: () => {
      alert('로그인에 실패했습니다.')
      navigate(ROUTE.LOGIN)
    },
  })

  return { mutate }
}

export { useKakaoLogin }
