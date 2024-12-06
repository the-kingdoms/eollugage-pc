import api from './network'

interface PostLoginResponse {
  token: string
}

interface PostSendVerificationCodeResponse {
  id: string
}

export interface PostKakaoLoginBody {
  code: string
  state: string
  redirectUri: string
}

export interface PostSendVerificationCodeBody {
  name: string
  phone: string
}

export interface PostPhoneLoginBody {
  uid: string
  verificationCode: string
}

async function postKakaoLogin(body: PostKakaoLoginBody): Promise<PostLoginResponse> {
  const { data } = await api.post(`/api/login/kakao`, body)
  return data
}

async function postPhoneLogin(body: PostPhoneLoginBody): Promise<PostLoginResponse> {
  const { data } = await api.post(`/api/v1/login/phone`, body)
  return data
}

async function postSendVerificationCode(body: PostSendVerificationCodeBody): Promise<PostSendVerificationCodeResponse> {
  const { data } = await api.post(`/api/v1/send-verification-code`, body)
  return data
}

export { postKakaoLogin, postPhoneLogin, postSendVerificationCode }
