import { createContextualCan } from '@casl/react'
import { AbilityContext } from '@/auth/casl/ability-context'

/**
 * Uso: <Can I="view" a="Menu:Dashboard">...</Can>
 * `I` = ação, `a` = subject (tupla [string, string]).
 */
export const Can = createContextualCan(AbilityContext.Consumer)
