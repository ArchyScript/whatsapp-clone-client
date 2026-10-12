<script setup lang="ts">
import { defineProps } from "vue"
import { UnreadMessageCount, ChatAvatar } from "@/components/Common"
import type { ChatType, ChatStatus } from "@/types"

interface Props {
  chat: ChatType
}
interface Emit {
  (event: "click", payload: ChatType): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const chatClasses: Record<ChatStatus, { class: string; icon: string }> = {
  sent: {
    class: "text-gray-500",
    icon: "status-check"
  },
  delivered: {
    class: "text-gray-500",
    icon: "status-dblcheck"
  },
  read: {
    class: "text-blue-500",
    icon: "status-dblcheck"
  }
}

const selectChat = () => {
  emit("click", props.chat)
}
</script>

<template>
  <div
    class="flex items-center truncate hover:bg-whatsapp-hover cursor-pointer select-none"
    @click="selectChat"
  >
    <!-- Image container -->
    <div class="p-3">
      <!-- Chat -->
      <!-- <div class="flex-shrink-0 w-12 h-12" v-if="chat.isChat">
        <img class="w-full h-full rounded-full object-cover" alt="Profile" :src="chat?.images?.profile" />
      </div> -->
      <ChatAvatar :isChat="chat.isChat" :imageUrl="chat?.images?.profile" defaultType="user" />

      <!-- Group Chats -->
      <div v-if="chat.isGroup" class="w-12 h-12">
        <!-- GROUP IN COMMUNITY  -->
        <ChatAvatar
          v-if="chat.isCommunity"
          :isGroup="chat.isGroup"
          :isCommunity="chat.isCommunity"
          :groupImage="chat?.images?.groupImage"
          :communityImage="chat?.images?.communityImage"
        />

        <!-- GROUP WITHOUT COMMUNITY  -->
        <ChatAvatar
          v-else
          :isGroup="chat.isGroup"
          :isCommunity="chat.isCommunity"
          :groupImage="chat?.images?.groupImage"
          :communityImage="chat?.images?.communityImage"
        />
      </div>
    </div>

    <!-- Text content -->
    <div class="flex-grow truncate text-white border-b border-gray-700 p-3 pl-0">
      <!-- Chat -->
      <div v-if="chat.isChat">
        <div class="flex justify-between items-center truncate">
          <h5 class="font-bold">{{ chat.contactName }}</h5>
          <span class="text-sm">{{ chat.time }}</span>
        </div>

        <div class="flex justify-between items-center truncate">
          <p class="flex-1 text-gray-500 flex items-center truncate">
            <Icon
              :name="chatClasses[chat.status].icon"
              class="!h-[18px]"
              :class="chatClasses[chat.status].class"
            />
            <span class="font-medium truncate">{{ chat.lastMessage?.content }}</span>
          </p>

          <div class="flex space-x-2 items-center">
            <!-- Pin icon -->
            <Icon name="pin" class="!h-3.5" v-if="chat.isPinned" />
            <!-- unread message -->
            <UnreadMessageCount :isRead="chat.isRead" :message="chat.unreadMessages" />
          </div>
        </div>
      </div>

      <!-- Group Chat  -->
      <div class="truncate" v-if="chat.isGroup">
        <!-- for group with community -->
        <div class="flex items-center justify-between truncate" v-if="chat.isCommunity">
          <span class="text-sm font-medium truncate" title="Sleekware" aria-label="">{{
            chat.communityName
          }}</span>
          <div class="text-xs text-gray-500">{{ chat.time }}</div>
        </div>

        <div class="flex justify-between items-center truncate">
          <h5 class="font-bold truncate">{{ chat.groupName }}</h5>

          <!-- for group with community -->
          <div class="flex space-x-1 items-center" v-if="chat.isCommunity">
            <Icon name="pin" class="!h-3.5 !w-3.5" v-if="chat.isPinned" />
            <UnreadMessageCount :isRead="chat.isRead" :message="chat.unreadMessages" />
          </div>

          <!-- for group with no community -->
          <span class="text-sm" v-else> {{ chat.time }} </span>
        </div>

        <!-- Last message -->
        <!-- TODO: CHANGE COLOR IF MESSAGE IS UNREAD OR READ -->
        <div class="flex justify-between items-center truncate">
          <p class="flex-1 flex space-x-2 text-gray-500 font-medium truncate">
            <span class="inline-block">{{ chat.lastMessage?.sender }} : </span>
            <span class="inline-block truncate">{{ chat.lastMessage?.content }}</span>
          </p>

          <div class="flex space-x-1 items-center" v-if="!chat.isCommunity">
            <Icon name="pin" class="!h-3.5 !w-3.5" v-if="chat.isPinned" />
            <UnreadMessageCount :isRead="chat.isRead" :message="chat.unreadMessages" />
            <Icon name="chevron" class="!h-5 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
