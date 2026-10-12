import type { SessionInfo } from './Session'

export interface AuthenticatedUser {
  id: string
  phoneNumber: string
  countryCode: string
  displayName: string
  username: string | null
  avatarUrl: string | null
  about: string
  lastSeenAt: string | null
  isOnline: boolean
  createdAt: string
  updatedAt: string
  privacySettings?: {
    lastSeenVisibility: 'EVERYONE' | 'CONTACTS' | 'NOBODY'
    profilePhotoVisibility: 'EVERYONE' | 'CONTACTS' | 'NOBODY'
    aboutVisibility: 'EVERYONE' | 'CONTACTS' | 'NOBODY'
    readReceiptsEnabled: boolean
  }
}

export interface AuthSuccessResponse {
  user: AuthenticatedUser
  tokens: {
    accessToken: string
    refreshToken: string
  }
  session: SessionInfo
}
