import DashboardPage from '@/pages/DashboardPage'
import { PermissionGuard } from '@/auth/guard/permission-guard'

/**
 * Conteúdo da rota index `/dashboard` com guard CASL.
 * As rotas em si ficam declaradas em `App.tsx` (filhos diretos de `<Routes>`).
 */
export function DashboardIndexRoute() {
  return (
    <PermissionGuard required={{ action: 'view', subject: 'retechfin.dashboard' }} hasContent>
      <DashboardPage />
    </PermissionGuard>
  )
}
