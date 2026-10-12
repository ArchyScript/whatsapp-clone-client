<template>
  <header class="flex items-center gap-3 border-b border-whatsapp-hover bg-whatsapp-header px-4 py-3 md:px-6">
    <!-- back button for mobile screen alone -->
    <button
      class="inline-flex w-10 items-center justify-center rounded-full p-2 text-whatsapp-muted transition hover:bg-whatsapp-hover md:hidden"
      type="button"
      @click="hideChat"
    >
      <Icon name="back" />
    </button>

    <div class="h-10 w-10 overflow-hidden rounded-full border border-whatsapp-hover">
      <img :src="avatarSrc" class="h-full w-full rounded-full object-cover" />
    </div>

    <!-- Name Section -->
    <div class="flex-1 flex flex-col space-y-0.5">
      <span class="font-semibold text-white">{{ title }}</span>
      <span class="text-sm text-whatsapp-muted">{{ subtitle }}</span>
    </div>

    <!-- Action Buttons Section -->
    <div class="flex items-center gap-1 text-whatsapp-icon">
      <div
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-whatsapp-hover p-0.5 transition duration-300 ease-in-out"
      >
        <img src="@/assets/images/whatsapp.png" class="h-full w-full rounded-full" />
      </div>

      <button class="rounded-full p-2 transition hover:bg-whatsapp-hover" type="button">
        <Icon name="search-alt" />
      </button>
      <button class="rounded-full p-2 transition hover:bg-whatsapp-hover" type="button">
        <Icon name="video-call" />
      </button>
      <button class="rounded-full p-2 transition hover:bg-whatsapp-hover" type="button">
        <Icon name="menu" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useAppStore } from "@/stores/app"
import placeholderImage from "@/assets/images/placeholder.png"

const { setShowChat, selectedChat } = useAppStore()

const chat = computed(() => selectedChat)
const title = computed(() => {
  if (!chat.value) return "Select a conversation"

  if (chat.value.isChat) {
    return chat.value.contactName ?? "Direct message"
  }

  return chat.value.groupName ?? "Group chat"
})

const subtitle = computed(() => {
  if (!chat.value) return "Your messages stay on the frontend for now."

  if (chat.value.isChat) {
    return `${chat.value.lastSeen} • ${chat.value.lastMessage.sender} sent the latest message`
  }

  if (chat.value.isCommunity && chat.value.communityName) {
    return `${chat.value.communityName} community`
  }

  return `${chat.value.unreadMessages} unread messages`
})

const avatarSrc = computed(() => {
  if (!chat.value) return placeholderImage

  return (
    chat.value.images.profile ??
    chat.value.images.groupImage ??
    chat.value.images.communityImage ??
    placeholderImage
  )
})

const hideChat = () => {
  setShowChat(false)
}
</script>
