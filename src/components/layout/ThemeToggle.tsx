import { IconButton, Tooltip } from '@mui/material'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { useUiStore } from '@/store/uiStore'

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useUiStore()

  return (
    <Tooltip title={colorMode === 'dark' ? 'Modo claro' : 'Modo escuro'}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        aria-label="Alternar tema"
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        {colorMode === 'dark' ? (
          <LightModeRoundedIcon fontSize="small" />
        ) : (
          <DarkModeRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  )
}
