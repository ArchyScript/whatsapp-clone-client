<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-semibold text-center mb-4 text-gray-800">Socket.IO Client</h1>

      <div v-if="connected" class="text-center">
        <p class="mb-4 text-green-600">
          Connected as User: <strong>{{ userId }}</strong>
        </p>
        <button
          @click="disconnectSocket"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Disconnect
        </button>
      </div>

      <div v-else>
        <input
          v-model="userId"
          placeholder="Enter your User ID"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          @click="connectToSocket"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-2 rounded-lg"
        >
          Connect
        </button>
      </div>

      <div v-if="messages.length > 0" class="mt-6">
        <h2 class="text-lg font-medium text-gray-700 mb-3">Messages</h2>
        <ul class="space-y-2">
          <li
            v-for="message in messages"
            :key="message.id"
            class="p-3 bg-gray-50 rounded-lg shadow-sm"
          >
            {{ message.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, computed } from "vue"
import { connectSocket, disconnectSocket, getSocket } from "@/infrastructures/socket"
import { useAppStore } from "@/stores/app"
import { io } from "socket.io-client"
import { useSocket } from "@/composables/useSocket"

const userId = ref("")
const connected = ref(false)
const messages = ref<{ id: string; text: string }[]>([])

const token = computed(() => useAppStore().token)

const { socket } = useSocket(token.value)

// const socket = io(SOCKET_URL, {
//   extraHeaders: {
//     Authorization: `Bearer ${token}`
//   }
// })

// const connectToSocket = () => {
//   if (!userId.value) {
//     alert("Please enter a User ID.")
//     return
//   }

//   socket = connectSocket(userId.value)
//   socket.connect()
//   connected.value = true

//   socket.on("message", message => {
//     messages.value.push({ id: Date.now().toString(), text: message })
//   })
// }

// const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect()
//     connected.value = false
//   }
// }

// const connectToSocket = () => {
//   if (!userId.value) {
//     return console.log("Please enter a User ID.")
//   }

//   socket = connectSocket(userId.value)
//   connected.value = true

//   // Listen for incoming messages
//   socket?.on("message", (message: string) => {
//     messages.value.push(message)
//   })
// }

// const sendMessage = (message: string) => {
//   socket?.emit("message", message)
// }

// const socket = io(SOCKET_URL, {
//   query: { userId: "exampleUserId" } // Pass userId or other connection details
// })

// Optional: log connection status
// socket.on("connect", () => {
//   // console.log("client", new Date().toLocaleString())
//   // console.log("client milli", new Date().getMilliseconds())

//   // Emit login event
//   socket.emit("login", {
//     token,
//     socketId: socket.id
//   })
// })

// onMounted(() => {
//   console.log("mounted socket")

//   socket.on("login", data => {
//     console.log("Received event data:", data)
//   })
// })
// onUnmounted(() => {
//   if (socket) {
//     socket.disconnect()
//   }
// })
</script>

<style scoped>
/* Add any custom styles here, but Tailwind should cover most needs */
</style>
