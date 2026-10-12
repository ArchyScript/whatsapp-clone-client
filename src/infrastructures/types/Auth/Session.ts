export interface SessionInfo {
  id: string
  deviceName?: string | null
  deviceId?: string | null
  userAgent?: string | null
  ipAddress?: string | null
  lastUsedAt: string
  expiresAt: string
  createdAt: string
}
