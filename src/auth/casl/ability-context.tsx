import { createContext, useContext, type ReactNode } from 'react'
import { Ability } from '@casl/ability'
import { buildAbility, type AppAbility } from '@/auth/casl/ability'

const emptyAbility = new Ability<[string, string]>([])

export const AbilityContext = createContext<AppAbility>(emptyAbility)

export function AbilityProvider({ value, children }: { value: AppAbility; children: ReactNode }) {
  return <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>
}

/**
 * Lê a instância CASL atual. O default do contexto é uma ability vazia (nunca é undefined).
 */
export function useAbilityContext(): AppAbility {
  return useContext(AbilityContext)
}

/** Ability vazia explícita (útil em testes ou SSR). */
export function createEmptyAbility(): AppAbility {
  return buildAbility([])
}
