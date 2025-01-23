<template>
  <div class="w-full h-full flex flex-col space-y-8 justify-between p-3 overflow-y-auto no-scroll">
    <div class="flex w-full flex-col items-center space-y-3 flex-1 py-2">
      <!-- Links -->
      <div v-for="link in sideBarTabs" class="relative">
        <a-tooltip :title="link.title" placement="right">
          <div
            class="w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-[#AEBAC1] transition duration-300 ease-in-out"
            :class="{
              'bg-[#374248]': link.title === activeTab
            }"
            @click="selectTab(link.title)"
          >
            <Icon :name="activeTab === link.title ? link.icon : `${link.icon}-outline`" />
          </div>

          <!-- active state -->
          <!-- <span class="absolute inline-block right-0.5 top-0.5 h-2 w-2 rounded-full bg-green-400">
          </span> -->
        </a-tooltip>
      </div>

      <!-- Meta AI -->
      <div class="relative">
        <a-tooltip title="Meta" placement="right">
          <div
            @click="selectTab('meta')"
            class="w-10 h-10 cursor-pointer rounded-full flex justify-center items-center transition duration-300 ease-in-out"
          >
            <img src="@/assets/images/meta-ai.png" class="h-6 w-6" />
          </div>
        </a-tooltip>
        <!-- <Tooltip text="Meta" /> -->
      </div>
    </div>

    <div class="flex w-full flex-col items-center space-y-3 py-2">
      <div class="relative">
        <a-tooltip :title="isDarkMode ? 'Light Mode' : 'Dark Mode'" placement="right">
          <div
            @click="toggleDarkMode"
            class="w-9 h-9 cursor-pointer border rounded-full flex justify-center items-center text-[#AEBAC1] hover:bg-[#374248] transition duration-300 ease-in-out"
          >
            <Icon :name="isDarkMode ? 'sun' : 'moon'" />
          </div>
        </a-tooltip>
      </div>

      <div class="relative">
        <a-tooltip title="Settings" placement="right">
          <div
            @click="selectTab('settings')"
            class="w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-[#AEBAC1] hover:bg-[#374248] transition duration-300 ease-in-out"
            :class="{
              'bg-[#374248]': activeTab === 'settings'
            }"
          >
            <Icon :name="activeTab === 'settings' ? 'settings' : 'settings-outline'" />
          </div>
        </a-tooltip>
      </div>

      <!-- Profile Image -->
      <div class="relative">
        <a-tooltip title="Profile" placement="right">
          <div
            @click="selectTab('profile')"
            class="w-8 h-8 p-0.5 cursor-pointer rounded-full flex justify-center items-center border transition duration-300 ease-in-out"
          >
            <img src="@/assets/images/whatsapp.png" class="h-full w-full rounded-full" />
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAppStore } from "@/stores/app"
const { setActiveTab } = useAppStore()
import { getAuthTest } from "@/infrastructures/api"
const isDarkMode = ref(false)

const activeTab = computed(() => useAppStore().activeTab)
const sideBarTabs = [
  {
    title: "chats",
    icon: "chats"
  },
  {
    title: "status",
    icon: "status"
  },
  {
    title: "channels",
    icon: "newsletter"
  },
  {
    title: "communities",
    icon: "communities"
  }
]

const selectTab = async (tab: string) => {
  await getAuthTest()
  setActiveTab(tab)
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle("dark", isDarkMode.value)
}
onMounted(() => {
  // await getAuthTest()
  if (localStorage.getItem("theme") === "dark") {
    isDarkMode.value = true
    document.documentElement.classList.add("dark")
  }
})
</script>

<style scoped>
.relative:hover .opacity-0 {
  opacity: 1;
}
</style>
