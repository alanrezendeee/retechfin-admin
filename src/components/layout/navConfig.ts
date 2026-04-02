import type { SvgIconComponent } from '@mui/icons-material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

export type NavItem = {
  label: string
  path: string
  icon: SvgIconComponent
  soon?: boolean
}

export const mainNav: NavItem[] = [
  { label: 'Painel', path: '/dashboard', icon: DashboardRoundedIcon },
  { label: 'Transações', path: '/dashboard/transacoes', icon: ReceiptLongRoundedIcon, soon: true },
  { label: 'Categorias', path: '/dashboard/categorias', icon: CategoryRoundedIcon, soon: true },
  { label: 'Contas', path: '/dashboard/contas', icon: AccountBalanceRoundedIcon, soon: true },
  { label: 'Cartões', path: '/dashboard/cartoes', icon: CreditCardRoundedIcon, soon: true },
  { label: 'Metas', path: '/dashboard/metas', icon: FlagRoundedIcon, soon: true },
]

export const bottomNav: NavItem[] = [
  { label: 'Configurações', path: '/dashboard/configuracoes', icon: SettingsRoundedIcon, soon: true },
]
