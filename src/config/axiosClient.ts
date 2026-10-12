import axios from 'axios'
import type { AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

// Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default apiClient
