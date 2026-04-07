import type { User } from '@/types/auth'

/** Abilities fixas para desenvolvimento com VITE_AUTH_USE_MOCK=true */
export const mockAbilitiesMaster = [{ action: 'manage', subject: 'all' }] as const

export const mockAbilitiesMember = [
  { action: 'view', subject: 'retechfin.dashboard' },
  { action: 'view', subject: 'Menu:Dashboard' },
] as const

export const mockUserDemo: User = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'João Silva',
  email: 'demo@retechfin.com',
}

export const mockUserMember: User = {
  id: '00000000-0000-0000-0000-000000000002',
  name: 'Maria Santos',
  email: 'maria@retechfin.com',
}

export function mockAbilitiesForEmail(email: string) {
  if (email === mockUserMember.email) {
    return [...mockAbilitiesMember]
  }
  return [...mockAbilitiesMaster]
}

export function mockUserForEmail(email: string): User | undefined {
  if (email === mockUserDemo.email) {
    return mockUserDemo
  }
  if (email === mockUserMember.email) {
    return mockUserMember
  }
  return undefined
}
