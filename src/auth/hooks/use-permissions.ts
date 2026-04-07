import { useMemo } from 'react'
import { useAbility } from '@/auth/casl/use-ability'
import { extractRoles, isMasterUser } from '@/auth/casl/ability'
import type { CASLAbility } from '@/auth/services/auth.service'

function rulesToCASLAbilities(ability: ReturnType<typeof useAbility>): CASLAbility[] {
  return ability.rules
    .filter((r) => !r.inverted)
    .map((r) => {
      const action = Array.isArray(r.action) ? r.action[0] : r.action
      const subject = Array.isArray(r.subject) ? r.subject[0] : r.subject
      return {
        action: String(action),
        subject: String(subject),
        conditions: r.conditions as Record<string, unknown> | undefined,
      }
    })
}

/**
 * Permissões na UI (botões, ações) — padrão RetechFin.
 * Ex.: const { can } = usePermissions(); can('read', 'retechfin.devices')
 */
export function usePermissions() {
  const ability = useAbility()
  const isMaster = ability.can('manage', 'all')

  const can = (action: string, subject: string) => ability.can(action, subject)

  const canAny = (rules: { action: string; subject: string }[]) =>
    rules.some((r) => ability.can(r.action, r.subject))

  const canAll = (rules: { action: string; subject: string }[]) =>
    rules.every((r) => ability.can(r.action, r.subject))

  const permissions = useMemo(() => {
    return ability.rules.flatMap((rule) => {
      if (rule.inverted) {
        return []
      }
      const actions = Array.isArray(rule.action) ? rule.action : [rule.action]
      const subjects = Array.isArray(rule.subject) ? rule.subject : [rule.subject]
      return actions.flatMap((a) => subjects.map((s) => `${String(a)}:${String(s)}`))
    })
  }, [ability])

  const caslFromRules = useMemo(() => rulesToCASLAbilities(ability), [ability])

  const roles = useMemo(() => extractRoles(caslFromRules), [caslFromRules])
  const masterFromRules = useMemo(() => isMasterUser(caslFromRules), [caslFromRules])

  const getAllPermissions = () => [...permissions]

  return {
    can,
    canAny,
    canAll,
    isMaster: isMaster || masterFromRules,
    permissions,
    roles,
    getAllPermissions,
    /** Placeholder alinhado ao padrão Minimal — sessão CASL é síncrona após /me. */
    isLoading: false,
  }
}
