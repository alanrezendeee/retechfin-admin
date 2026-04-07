import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LoginCredentials, User } from '@/types/auth'
import { authService, setAuthAccessToken } from '@/auth/services/auth.service'
import { signInWithPassword } from '@/auth/context/jwt/action'
import { buildAbility, type AppAbility } from '@/auth/casl/ability'
import { AbilityProvider } from '@/auth/casl/ability-context'
import { mockAbilitiesForEmail } from '@/auth/context/jwt/mock-auth'

const SESSION_KEY = 'retechfin-admin-session'

type SessionPayload = {
  accessToken: string
  refreshToken: string
  user: User
}

function readSession(): SessionPayload | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) {
      return null
    }
    const data = JSON.parse(raw) as SessionPayload
    if (!data?.accessToken || !data?.user) {
      return null
    }
    return data
  } catch {
    return null
  }
}

function writeSession(payload: SessionPayload): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
}

function clearStoredSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  checkUserSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}

function mapMeUser(u: { id: string; email: string; name: string }): User {
  return { id: u.id, name: u.name, email: u.email }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [ability, setAbility] = useState<AppAbility | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const checkUserSession = useCallback(async () => {
    const session = readSession()
    if (!session?.accessToken) {
      setAuthAccessToken(null)
      setUser(null)
      setAbility(undefined)
      setIsInitialized(true)
      return
    }

    setAuthAccessToken(session.accessToken)

    if (import.meta.env.VITE_AUTH_USE_MOCK === 'true') {
      setUser(session.user)
      setAbility(buildAbility(mockAbilitiesForEmail(session.user.email)))
      setIsInitialized(true)
      return
    }

    try {
      const me = await authService.me()
      const nextUser = mapMeUser(me.user)
      setUser(nextUser)
      setAbility(buildAbility(me.abilities ?? []))
      writeSession({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: nextUser,
      })
    } catch {
      clearStoredSession()
      setAuthAccessToken(null)
      setUser(null)
      setAbility(undefined)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    void checkUserSession()
  }, [checkUserSession])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const result = await signInWithPassword(credentials)
      writeSession({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      })
      setAuthAccessToken(result.accessToken)
      setUser(result.user)
      setAbility(buildAbility(result.abilities))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    clearStoredSession()
    setUser(null)
    setAbility(undefined)
    setIsInitialized(true)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      isInitialized,
      login,
      logout,
      checkUserSession,
    }),
    [user, isLoading, isInitialized, login, logout, checkUserSession]
  )

  const abilityForTree = ability ?? buildAbility([])

  return (
    <AuthContext.Provider value={value}>
      <AbilityProvider value={abilityForTree}>{children}</AbilityProvider>
    </AuthContext.Provider>
  )
}
