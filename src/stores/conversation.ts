import { computed, ref } from "vue"
import { defineStore } from "pinia"
import type { ChatMessage, ChatType } from "@/types"
import { chats } from "@/db"
import { useAppStore } from "@/stores/app"

const getChatKey = (chat?: ChatType) => {
  if (!chat) return ""

  if (chat.isChat) {
    return `chat:${chat.contactName ?? "direct"}`
  }

  return `group:${chat.communityName ?? "general"}:${chat.groupName ?? "group"}`
}

const createSeedMessages = (chat: ChatType, index: number): ChatMessage[] => {
  const title = chat.contactName ?? chat.groupName ?? "this conversation"
  const context = chat.isCommunity && chat.communityName ? ` inside ${chat.communityName}` : ""

  return [
    {
      id: `${getChatKey(chat)}-1`,
      body: `Welcome to ${title}${context}. This thread is using mock frontend data for now.`,
      direction: "incoming",
      time: "09:10"
    },
    {
      id: `${getChatKey(chat)}-2`,
      body: "Perfect. Once the layout feels right, we can connect this to the server and sockets.",
      direction: "outgoing",
      time: "09:12",
      status: "read"
    },
    {
      id: `${getChatKey(chat)}-3`,
      body: chat.lastMessage.content,
      direction: index % 2 === 0 ? "incoming" : "outgoing",
      time: chat.time,
      status: "read"
    }
  ]
}

const seedConversationMap = chats.reduce<Record<string, ChatMessage[]>>((accumulator, chat, index) => {
  accumulator[getChatKey(chat)] = createSeedMessages(chat, index)
  return accumulator
}, {})

export const useConversationStore = defineStore("conversation", () => {
  const appStore = useAppStore()
  const draft = ref("")
  const messagesByChat = ref<Record<string, ChatMessage[]>>(seedConversationMap)

  const currentChatKey = computed(() => getChatKey(appStore.selectedChat))
  const currentMessages = computed(() => {
    if (!currentChatKey.value) return []
    return messagesByChat.value[currentChatKey.value] ?? []
  })

  const setDraft = (value: string) => {
    draft.value = value
  }

  const sendMessage = () => {
    const content = draft.value.trim()
    if (!content || !currentChatKey.value) return

    const nextMessage: ChatMessage = {
      id: `${currentChatKey.value}-${Date.now()}`,
      body: content,
      direction: "outgoing",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "sent"
    }

    messagesByChat.value[currentChatKey.value] = [
      ...(messagesByChat.value[currentChatKey.value] ?? []),
      nextMessage
    ]
    draft.value = ""
  }

  return {
    currentMessages,
    draft,
    messagesByChat,
    sendMessage,
    setDraft
  }
})
