import axios from 'axios'

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

export default api
