import { useMemo } from 'react'
import { ThemeProvider } from '@mui/material'
import { useUiStore } from '@/store/uiStore'
import { createAppTheme } from '@/theme/createAppTheme'

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const colorMode = useUiStore((s) => s.colorMode)
  const theme = useMemo(() => createAppTheme(colorMode), [colorMode])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
