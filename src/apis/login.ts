import api from './network'

interface PostLoginResponse {
  token: string
}

export interface PostKakaoLoginBody {
  code: string
  state: string
  redirectUri: string
}

async function postKakaoLogin(body: PostKakaoLoginBody): Promise<PostLoginResponse> {
  const { data } = await api.post(`/api/login/kakao`, body)
  return data
}

export { postKakaoLogin }
