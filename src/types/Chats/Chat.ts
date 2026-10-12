export interface ChatType {
  isChat: boolean
  isGroup: boolean
  isCommunity?: boolean
  communityName?: string // Only for groups that are part of a community
  groupName?: string // For groups
  contactName?: string // For normal chats
  lastMessage: {
    sender: string
    content: string
  }
  time: string
  lastSeen: string
  status: ChatStatus
  unreadMessages: number
  images: {
    communityImage?: string // For groups in a community
    groupImage?: string // For groups
    profile?: string // For normal chats
  }
  isPinned: boolean
  isRead: boolean
}

export type ChatStatus = 'sent' | 'read' | 'delivered'

export interface ChatMessage {
  id: string
  body: string
  direction: "incoming" | "outgoing"
  time: string
  status?: ChatStatus
}
