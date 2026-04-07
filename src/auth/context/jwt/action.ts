import { authService } from '@/auth/services/auth.service'
import type { LoginCredentials } from '@/types/auth'
import type { AuthLoginResult } from '@/auth/services/auth.service'

/**
 * Login com retechauth-api (ou mock via authService quando aplicável).
 * Persistência de sessão e segunda chamada a /me ficam no AuthProvider (checkUserSession).
 */
export async function signInWithPassword(credentials: LoginCredentials): Promise<AuthLoginResult> {
  return authService.login(credentials)
}
