export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  /** Campos legados / futuros domínio RetechFin (não vêm do retechauth-api hoje). */
  role?: 'admin' | 'member'
  familyId?: string
  familyName?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

/** Resposta de login já normalizada para o app (tokens + usuário). */
export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
