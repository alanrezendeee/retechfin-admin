import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { useAuth } from '@/auth/context/jwt/auth-provider'
import { lp } from '@/theme/tokens'

export function UserMenu() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const open = Boolean(anchor)

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? '?'

  const handleLogout = async () => {
    setAnchor(null)
    await logout()
    navigate('/login')
  }

  return (
    <>
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
        size="small"
        aria-label="Conta"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          p: 0.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            fontSize: '0.95rem',
            fontWeight: 700,
            bgcolor: lp.neon,
            color: lp.black,
          }}
        >
          {initial}
        </Avatar>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: { minWidth: 220, mt: 1, borderRadius: 2 },
          },
        }}
      >
        <MenuItem disabled sx={{ opacity: '1 !important', py: 1.5 }}>
          <ListItemText
            primary={
              <Typography variant="subtitle2" noWrap fontWeight={700}>
                {user?.name}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            }
          />
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon>
            <PersonRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Perfil" secondary="Em breve" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </MenuItem>
      </Menu>
    </>
  )
}
