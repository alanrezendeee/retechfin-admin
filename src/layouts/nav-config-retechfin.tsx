import type { NavDataSection } from '@/layouts/components/nav-filter-by-casl'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

/**
 * Menu RetechFin Admin — subjects alinhados ao manifest / abilities da API de auth (retechauth-api).
 * Exemplo de uso com CASL: <Can I="view" a="Menu:Dashboard" /> ou subjects `retechfin.*`.
 */
export const retechfinNavSections: NavDataSection[] = [
  {
    subheader: 'Menu',
    items: [
      {
        label: 'Painel',
        path: '/dashboard',
        icon: DashboardRoundedIcon,
        permission: { action: 'view', subject: 'retechfin.dashboard' },
      },
      {
        label: 'Transações',
        path: '/dashboard/transacoes',
        icon: ReceiptLongRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.transactions' },
      },
      {
        label: 'Categorias',
        path: '/dashboard/categorias',
        icon: CategoryRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.categories' },
      },
      {
        label: 'Contas',
        path: '/dashboard/contas',
        icon: AccountBalanceRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.accounts' },
      },
      {
        label: 'Cartões',
        path: '/dashboard/cartoes',
        icon: CreditCardRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.cards' },
      },
      {
        label: 'Metas',
        path: '/dashboard/metas',
        icon: FlagRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.goals' },
      },
    ],
  },
  {
    items: [
      {
        label: 'Configurações',
        path: '/dashboard/configuracoes',
        icon: SettingsRoundedIcon,
        soon: true,
        permission: { action: 'view', subject: 'retechfin.settings' },
      },
    ],
  },
]
