import { ROUTE } from 'constants/path'
import { useMutation } from '@tanstack/react-query'
import {
  PostKakaoLoginBody,
  PostPhoneLoginBody,
  PostSendVerificationCodeBody,
  postKakaoLogin,
  postPhoneLogin,
  postSendVerificationCode,
} from 'apis/login'
import { setTokenFromLocalStorage } from 'apis/network'
import { useNavigate } from 'react-router-dom'
import { useGetMy } from './useMy'

function useKakaoLogin() {
  const navigate = useNavigate()
  const { refetch } = useGetMy('click')

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

function usePhoneLogin() {
  const navigate = useNavigate()
  const { refetch } = useGetMy('click')

  const { mutate: sendVerifcationCodeMutate } = useMutation({
    mutationKey: ['postSendVerifcationCode'],
    mutationFn: ({ data }: { data: PostSendVerificationCodeBody }) => postSendVerificationCode(data),
    retry: false,
    onError: () => {
      alert('인증번호 요청에 실패했습니다.')
    },
  })

  const { mutate: loginMutate } = useMutation({
    mutationKey: ['postPhoneLogin'],
    mutationFn: ({ data }: { data: PostPhoneLoginBody }) => postPhoneLogin(data),
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

  return { sendVerifcationCodeMutate, loginMutate }
}

export { useKakaoLogin, usePhoneLogin }
