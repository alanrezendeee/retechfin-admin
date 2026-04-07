import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { useAbility } from '@/auth/casl/use-ability'
import LoginIllustration from '@/components/auth/LoginIllustration'

export type NavItemPermission = {
  action: string
  subject: string
  conditions?: Record<string, unknown>
}

type RequiredPermission = NavItemPermission | NavItemPermission[]

function matchesRequired(
  ability: ReturnType<typeof useAbility>,
  required: RequiredPermission
): boolean {
  const list = Array.isArray(required) ? required : [required]
  return list.some((r) => ability.can(r.action, r.subject))
}

export type PermissionGuardProps = {
  children: ReactNode
  /** Se true, apenas usuários com manage + all passam. */
  requireMaster?: boolean
  /** Uma regra ou array (ANY). Conditions do required não são repassadas a can() — só as regras já injetadas no buildAbility. */
  required?: RequiredPermission
  /** Se false e bloqueado, retorna null; se true, mostra tela de acesso negado. */
  hasContent?: boolean
}

export function PermissionGuard({
  children,
  requireMaster = false,
  required,
  hasContent = false,
}: PermissionGuardProps) {
  const ability = useAbility()
  const isMaster = ability.can('manage', 'all')

  if (requireMaster && !isMaster) {
    if (!hasContent) {
      return null
    }
    return <AccessDenied />
  }

  if (required != null && !isMaster && !matchesRequired(ability, required)) {
    if (!hasContent) {
      return null
    }
    return <AccessDenied />
  }

  return <>{children}</>
}

function AccessDenied() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ maxWidth: 280, width: '100%', opacity: 0.85 }}>
        <LoginIllustration />
      </Box>
      <Typography variant="h6" fontWeight={800}>
        Acesso negado
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
        Você não tem permissão para ver este conteúdo. Em caso de dúvida, fale com o administrador da sua
        organização.
      </Typography>
    </Box>
  )
}

export function usePermissionCheck() {
  const ability = useAbility()
  const isMaster = ability.can('manage', 'all')

  const can = (action: string, subject: string) => ability.can(action, subject)

  const canAny = (rules: NavItemPermission[]) => rules.some((r) => ability.can(r.action, r.subject))

  const canAll = (rules: NavItemPermission[]) => rules.every((r) => ability.can(r.action, r.subject))

  return { can, canAny, canAll, isMaster }
}
