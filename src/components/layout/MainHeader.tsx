import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'
import { AppLogo } from './AppLogo'
import { useUiStore } from '@/store/uiStore'

const DRAWER_WIDTH = 280

type Props = {
  title?: string
}

export function MainHeader({ title = 'Painel' }: Props) {
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { lg: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: { xs: 64, sm: 72 } }}>
        {!isLg && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            aria-label="Abrir menu"
            sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center' }}>
          <AppLogo compact />
        </Box>

        <Typography
          variant="h6"
          component="h1"
          sx={{
            display: { xs: 'none', lg: 'block' },
            fontFamily: (t) => t.typography.h5.fontFamily,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {title}
        </Typography>

        <TextField
          size="small"
          placeholder="Buscar..."
          aria-label="Buscar"
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', sm: 360, lg: 420 },
            ml: { xs: 0, lg: 2 },
            display: { xs: 'none', sm: 'inline-flex' },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }} />

        <ThemeToggle />
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export const LAYOUT_DRAWER_WIDTH = DRAWER_WIDTH
