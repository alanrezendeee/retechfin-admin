import { Ability, AbilityBuilder } from '@casl/ability'
import type { CASLAbility } from '@/auth/services/auth.service'

/** Tupla fixa [action, subject] alinhada ao contrato da API retechauth-api. */
export type AppAbility = Ability<[string, string]>

export function buildAbility(abilitiesFromAPI: CASLAbility[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(Ability)
  for (const item of abilitiesFromAPI) {
    const cond = item.conditions
    if (cond != null && Object.keys(cond).length > 0) {
      // API envia conditions no formato Mongo/CASL; o builder tipa MongoQuery estrito.
      can(item.action, item.subject, cond as Parameters<typeof can>[2])
    } else {
      can(item.action, item.subject)
    }
  }
  return build()
}

export function isMasterUser(abilities: CASLAbility[]): boolean {
  return abilities.some((a) => a.action === 'manage' && a.subject === 'all')
}

/** Compatibilidade: master → ['Master']; senão subjects distintos de 'all'. */
export function extractRoles(abilities: CASLAbility[]): string[] {
  if (isMasterUser(abilities)) {
    return ['Master']
  }
  const subjects = new Set<string>()
  for (const a of abilities) {
    if (a.subject && a.subject !== 'all') {
      subjects.add(a.subject)
    }
  }
  return [...subjects]
}
