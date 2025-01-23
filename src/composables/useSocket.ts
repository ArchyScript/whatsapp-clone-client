import { ref, onUnmounted, onMounted, computed } from "vue"
import { Socket } from "socket.io-client"
import { io } from "socket.io-client"
const SOCKET_URL = "http://localhost:5000"

export const useSocket = (token: string) => {
  const socket = ref<Socket | null>(null)

  onMounted(() => {
    socket.value = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    socket.value.on("connect", () => {
      console.log("Connected to socket:", socket.value?.id)
      console.log("Socket  value", socket.value)

      // socket.value?.emit("login", {
      //   token,
      //   socketId: socket.value.id
      // })

      //   performLogin()
      //     .then(() => {
      //       socket.value?.emit("login", {
      //         token,
      //         socketId: socket.value.id
      //       })
      //       console.log("Login emitted with token and socket ID")
      //     })
      //     .catch((error: any) => {
      //       console.error("Login failed:", error)
      //     })
    })
  })

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect()
      socket.value?.emit("disconnected", token)
    }
  })

  return {
    socket
  }
}
