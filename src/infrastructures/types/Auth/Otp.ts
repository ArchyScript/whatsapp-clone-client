export interface RequestOtpRequest {
  phoneNumber: string
  countryCode?: string
}

export interface VerifyOtpRequest {
  phoneNumber: string
  countryCode?: string
  otp: string
  displayName?: string
  username?: string
  about?: string
  avatarUrl?: string
  deviceName?: string
  deviceId?: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
