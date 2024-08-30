import axios from 'axios';

/** Axios 인스턴스 생성 */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/** 
 * 요청 인터셉터 설정: 토큰이 있는 경우 헤더에 추가
 */
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
