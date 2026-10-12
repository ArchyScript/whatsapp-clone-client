import { getRequest, postRequest } from '@/infrastructures/apiHelper'
import type {
  SignupRequest,
  LoginRequest,
  RequestOtpRequest,
  VerifyOtpRequest,
  RefreshTokenRequest,
  AuthSuccessResponse,
  AuthenticatedUser
} from '../types'

const persistTokens = (payload: AuthSuccessResponse) => {
  localStorage.setItem('accessToken', payload.tokens.accessToken)
  localStorage.setItem('refreshToken', payload.tokens.refreshToken)
}

export const signup = async (payload: SignupRequest) => {
  try {
    const response = await postRequest('/auth/request-otp', {
      phoneNumber: payload.phoneNumber
    })
    console.log('response', response)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
export const login = async (payload: LoginRequest) => {
  try {
    const response = await postRequest('/auth/request-otp', {
      phoneNumber: payload.email
    })
    console.log('response', response)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const requestOtp = async (payload: RequestOtpRequest) => {
  const response = await postRequest('/auth/request-otp', payload)
  return response.data as {
    phoneNumber: string
    expiresInSeconds: number
    resendAvailableInSeconds: number
    devOtpCode?: string
  }
}

export const verifyOtp = async (payload: VerifyOtpRequest) => {
  const response = await postRequest('/auth/verify-otp', payload)
  const data = response.data as AuthSuccessResponse
  persistTokens(data)
  return data
}

export const refreshAuth = async (payload?: RefreshTokenRequest) => {
  const refreshToken = payload?.refreshToken ?? localStorage.getItem('refreshToken')
  const response = await postRequest('/auth/refresh', { refreshToken })
  const data = response.data as AuthSuccessResponse
  persistTokens(data)
  return data
}

export const logoutAuth = async () => {
  const response = await postRequest('/auth/logout', {
    refreshToken: localStorage.getItem('refreshToken')
  })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  return response.data
}

export const getCurrentUser = async () => {
  const response = await getRequest('/auth/me')
  return response.data as { user: AuthenticatedUser | null }
}

// export const socialLogin = async (provider:string) => {
//   try {
//     const response = await postRequest('/auth/signup')
//     console.log('response', response)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

export const getAuthTest = async () => {
  try {
    const response = await getRequest('/auth/test')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// // Fetch posts
// export const searchPhotos = async (query: SearchQueryParams): Promise<PhotoData> => {
//   let result = {} as PhotoData

//   try {
//     const response = await getRequest('/search/photos', query)
//     result = response.data
//   } catch (error) {
//     console.log('error', error)
//   }
//   return result
// }
