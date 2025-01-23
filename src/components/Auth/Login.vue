<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800">Login</h1>

      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <select
            id="email"
            v-model="selectedAccount"
            @change="updateFormFields"
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>Select an account</option>
            <option v-for="account in accounts" :key="account.email" :value="account.email">
              {{ account.email }}
            </option>
          </select>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none flex justify-center items-center focus:ring focus:ring-blue-300"
        >
          <svg
            v-if="loading"
            class="w-5 h-5 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>

          <span v-else="loading">Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/infrastructures/api"
import { reactive, ref } from "vue"
import { useAppStore } from "@/stores/app"
const { setLoginStatus, setLoginData } = useAppStore()

const selectedAccount = ref("")
const accounts = ref([
  { email: "scripted@mail.com", password: "Scripted@10" },
  { email: "archyscript@mail.com", password: "ArchyScript@10" },
  { email: "archyscripted@mail.com", password: "ArchyScripted@10" }
])
const updateFormFields = () => {
  console.log("selectedAccount", selectedAccount.value)
  const account = accounts.value.find(acc => acc.email === selectedAccount.value)
  if (account) {
    form.email = account.email
    form.password = account.password
  }
}
// Define the form state
const form = reactive({ email: "", password: "" })

const loading = ref(false)
const showPassword = ref(true)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Handle login form submission
const handleLogin = async () => {
  if (!form.email || !form.password) return
  loading.value = true

  const response = await login(form)
  loading.value = false

  if (!response) return
  console.log("form", form)
  console.log("response", response)

  setLoginStatus(true)
  setLoginData(response.data)
}
</script>

<style scoped>
/* Add custom styling if needed */
</style>
