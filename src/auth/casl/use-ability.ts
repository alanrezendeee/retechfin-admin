import { useAbilityContext } from '@/auth/casl/ability-context'

/** Alias de useAbilityContext — mesmo padrão do admin Minimal. */
export function useAbility() {
  return useAbilityContext()
}
