import axios from 'axios'

const setTokenFromLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) return null

  return accessToken
}

const eollugageUrl = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: eollugageUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
  },
  validateStatus: status => {
    return status < 300
  },
})
api.interceptors.request.use(
  async config => {
    if (typeof document !== 'undefined') {
      const token = getTokenFromLocalStorage()
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api
export { setTokenFromLocalStorage, getTokenFromLocalStorage }
