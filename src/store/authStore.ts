import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, LoginCredentials } from '@/types/auth'
import { authService } from '@/lib/api/auth.mock' // Troque para '@/lib/api/auth' quando backend estiver pronto

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  validateSession: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(credentials)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },

      validateSession: async () => {
        const state = useAuthStore.getState()
        if (!state.token) {
          return
        }

        try {
          const user = await authService.validateToken(state.token)
          set({
            user,
            isAuthenticated: true,
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },

      forgotPassword: async (email) => {
        await authService.forgotPassword(email)
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

