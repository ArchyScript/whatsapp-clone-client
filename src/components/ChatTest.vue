<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <!-- Join Chat -->
    <div v-if="!joined" class="w-96 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-4">Join the Chat</h1>
      <input
        type="text"
        v-model="username"
        placeholder="Enter your name"
        class="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 mb-4"
      />
      <button class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
        Join
      </button>
    </div>

    <!-- Chat Interface -->
    <div v-else class="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-md">
      <div class="flex h-96">
        <!-- Online Users -->
        <div class="w-1/4 border-r p-4">
          <h2 class="text-xl font-semibold mb-2">Online Users</h2>
          <ul class="space-y-2">
            <li
              v-for="user in users"
              :key="user.id"
              class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {{ user.username }}
            </li>
          </ul>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 flex flex-col">
          <div class="flex-1 p-4 overflow-y-auto">
            <div v-for="msg in messages" :key="msg.id" class="mb-4">
              <span class="block font-bold">{{ msg.username }}</span>
              <span class="block">{{ msg.text }}</span>
            </div>
          </div>
          <!-- Send Message -->
          <div class="flex items-center p-4 border-t">
            <input
              type="text"
              v-model="message"
              placeholder="Type a message"
              class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              @click="sendMessage"
              class="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { connectSocket, disconnectSocket, getSocket } from "@/infrastructures/socket"
import { io } from "socket.io-client"
import { useSocket } from "@/composables/useSocket"

// Initialize Socket.io client
const socket = io("http://localhost:5000")

// State
const username = ref("")
const message = ref("")
const messages = ref([])
const users = ref([])
const joined = ref(true)

// Join chat
// const joinChat = () => {
//   if (username.value.trim()) {
//     socket.emit("joinChat", username.value)
//     joined.value = true
//   }
// }

// Send message
const sendMessage = () => {
  if (message.value.trim()) {
    const messageData = {
      username: username.value,
      text: message.value
    } 
    socket.emit("sendMessage", messageData)
    // messages.value.push(messageData)
    // Add to local messages
    // message.value = ""
  }
}

// Lifecycle hooks
onMounted(() => {
  socket.on("receiveMessage", msg => {
    messages.value.push(msg)
  })

  socket.on("updateUsers", updatedUsers => {
    users.value = updatedUsers
  })
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<style scoped></style>
