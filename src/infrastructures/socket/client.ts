import { io } from 'socket.io-client'

export const createSocketClient = () => {
  const token = localStorage.getItem('accessToken')
  const baseUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL

  return io(baseUrl, {
    auth: {
      token
    }
  })
}
