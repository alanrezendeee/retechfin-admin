/**
 * Serviço de autenticação REAL
 * 
 * Este arquivo será usado quando o backend estiver pronto.
 * Por enquanto, o sistema usa auth.mock.ts
 * 
 * Para ativar:
 * 1. Implemente as chamadas reais usando axios
 * 2. Atualize os imports em src/store/authStore.ts para usar este arquivo
 */

import axios from 'axios'
import { LoginCredentials, LoginResponse, User } from '@/types/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  async validateToken(token: string): Promise<User> {
    const response = await api.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email })
  },
}

