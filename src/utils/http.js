import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
